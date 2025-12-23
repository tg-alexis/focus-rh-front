import { paths } from '@/paths';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

// // Utiliser le proxy Next.js pour éviter les problèmes CORS
// const API_BASE_URL = typeof window !== 'undefined' 
//   ? '/api/proxy' // Côté client : utiliser le proxy Next.js
//   : process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1'; // Côté serveur : appel direct


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1'; // Côté serveur : appel direct

// Flag pour éviter les redirections multiples (utiliser let au lieu de const)
let isRedirecting = false;

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

// Response interceptor pour gérer les erreurs globales
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide - déconnexion et redirection vers login
      if (typeof window !== 'undefined' && !isRedirecting) {
        isRedirecting = true; // Éviter les redirections multiples
        
        console.error('401 Unauthorized - Déconnexion en cours...');
        
        try {
          // Nettoyer le cache local d'abord
          localStorage.clear();
          sessionStorage.clear();
          
          // Appeler l'API de déconnexion NextAuth
          await fetch('/api/auth/signout', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          
          // Attendre un peu pour que la déconnexion soit effective
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (e) {
          console.error('Erreur lors de la déconnexion:', e);
        } finally {
          // Redirection forcée vers la page de login avec rechargement complet
          window.location.href = paths.auth.root;
          // Réinitialiser le flag après un délai
          setTimeout(() => {
            isRedirecting = false;
          }, 1000);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
