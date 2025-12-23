import { LoginSchema } from '@/features/auth/schema/auth-schema';
import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // Configuration des cookies pour la production
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  // Activer le debug en développement
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
          });

          console.log('🔵 Login API Response:', {
            status: response.status,
            data: response.data
          });

          // Gérer différentes structures de réponse possibles
          let accessToken: string;
          let refreshToken: string;

          // Cas 1: tokens directement dans response.data
          if (response.data.accessToken && response.data.refreshToken) {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
            console.log('✅ Tokens trouvés directement dans response.data');
          }
          // Cas 2: tokens dans response.data.data
          else if (response.data.data?.accessToken && response.data.data?.refreshToken) {
            accessToken = response.data.data.accessToken;
            refreshToken = response.data.data.refreshToken;
            console.log('✅ Tokens trouvés dans response.data.data');
          }
          // Cas 3: tokens dans response.data.tokens
          else if (response.data.tokens?.accessToken && response.data.tokens?.refreshToken) {
            accessToken = response.data.tokens.accessToken;
            refreshToken = response.data.tokens.refreshToken;
            console.log('✅ Tokens trouvés dans response.data.tokens');
          }
          else {
            console.error('❌ Impossible de trouver les tokens dans la réponse:', response.data);
            return null;
          }

          console.log('🔵 Récupération des infos utilisateur avec token:', accessToken.substring(0, 20) + '...');

          // Récupérer les informations de l'utilisateur
          const userResponse = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log('🔵 User API Response:', {
            status: userResponse.status,
            data: userResponse.data
          });

          // Gérer différentes structures de réponse utilisateur
          const user = userResponse.data.data || userResponse.data;

          const userObject = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            accessToken,
            refreshToken,
          };

          console.log('✅ Authentification réussie pour:', user.email);
          return userObject;
        } catch (error) {
          console.error('❌ Erreur d\'authentification:', error);
          if (axios.isAxiosError(error)) {
            console.error('❌ Détails de l\'erreur:', {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message
            });
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
