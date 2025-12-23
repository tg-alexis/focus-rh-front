import { paths } from '@/paths';
import axios from 'axios';
import type { NextAuthConfig } from 'next-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1';

export const authConfig = {
  pages: {
    signIn: paths.auth.root,
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.displayName = user.displayName;
      }

      // Valider le token à chaque requête (sauf lors du login initial)
      if (token.accessToken && trigger !== 'signIn') {
        try {
          await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
            timeout: 5000,
          });
        } catch (error) {
          // Token invalide ou expiré - forcer la déconnexion
          console.error('Token validation failed:', error);
          return null; // Cela invalidera la session
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Si le token est null (invalidé), retourner une session vide pour forcer la déconnexion
      if (!token) {
        throw new Error('Invalid token');
      }

      if (token && session.user) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user.id = token.userId || '';
        session.user.email = token.email || '';
        session.user.firstName = token.firstName || '';
        session.user.lastName = token.lastName || '';
        session.user.displayName = token.displayName || '';
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith('/auth');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Rediriger vers login
      } else if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL(paths.core.dashboard, nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
