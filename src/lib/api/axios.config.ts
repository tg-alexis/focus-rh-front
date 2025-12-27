import { paths } from '@/paths';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

// // Utiliser le proxy Next.js pour éviter les problèmes CORS
// const API_BASE_URL = typeof window !== 'undefined'
//   ? '/api/proxy' // Côté client : utiliser le proxy Next.js
//   : process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1'; // Côté serveur : appel direct

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://focus-rh-api.amicale-solidarite.ovh/api/v1'; // Côté serveur : appel direct

// Flag pour éviter les redirections multiples et le refresh token en cours
let isRedirecting = false;
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000,
	withCredentials: false, // Important pour éviter les problèmes CORS
});

// Request interceptor pour ajouter le token d'authentification
axiosInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const session = await getSession();

		if (session?.accessToken) {
			config.headers.Authorization = `Bearer ${session.accessToken}`;
		}

		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Response interceptor pour gérer les erreurs globales et le refresh token
axiosInstance.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
		
		// ⚠️ IMPORTANT: Ne pas intercepter les erreurs des URLs NextAuth pour éviter les boucles infinies
		const isNextAuthUrl = originalRequest?.url?.includes('/api/auth/');
		const isRefreshUrl = originalRequest?.url?.includes('/auth/refresh');

		// Gérer le 401 avec tentative de refresh token
		if (error.response?.status === 401 && !isNextAuthUrl && !originalRequest._retry) {
			if (isRefreshUrl) {
				// Si le refresh token lui-même échoue, déconnecter l'utilisateur
				console.log('🔴 Refresh token invalide - Déconnexion...');
				isRefreshing = false;
				processQueue(error, null);
				
				if (typeof window !== 'undefined' && !isRedirecting) {
					isRedirecting = true;
					await signOut({ redirect: false });
					window.location.href = paths.auth.root;
				}
				return Promise.reject(error);
			}

			originalRequest._retry = true;

			if (isRefreshing) {
				// Si un refresh est déjà en cours, mettre la requête en file d'attente
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => {
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			isRefreshing = true;

			try {
				console.log('🔄 Token expiré - Tentative de refresh...');
				
				const session = await getSession();
				
				if (!session?.refreshToken) {
					throw new Error('No refresh token available');
				}

				// Appeler l'endpoint de refresh
				const response = await axios.post(
					`${API_BASE_URL}/auth/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${session.refreshToken}`,
						},
					}
				);

				const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken;

				if (!newAccessToken) {
					throw new Error('No access token in refresh response');
				}

				console.log('✅ Token rafraîchi avec succès');

				// Mettre à jour la session NextAuth avec le nouveau token
				if (typeof window !== 'undefined') {
					// Déclencher une mise à jour de la session
					await fetch('/api/auth/session', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
				}

				// Mettre à jour le header de la requête originale
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				}

				isRefreshing = false;
				processQueue(null, newAccessToken);

				// Réessayer la requête originale avec le nouveau token
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				console.error('❌ Erreur lors du refresh token:', refreshError);
				isRefreshing = false;
				processQueue(error, null);

				// Si le refresh échoue, déconnecter l'utilisateur
				if (typeof window !== 'undefined' && !isRedirecting) {
					isRedirecting = true;
					
					try {
						localStorage.clear();
						sessionStorage.clear();
						await signOut({ redirect: false });
					} catch (e) {
						console.error('Erreur lors de la déconnexion:', e);
					}

					window.location.href = paths.auth.root;
					
					setTimeout(() => {
						isRedirecting = false;
					}, 2000);
				}

				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
