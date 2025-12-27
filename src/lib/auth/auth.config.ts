import { paths } from '@/paths';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: paths.auth.root,
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Lors de la connexion initiale
      if (user) {
        console.log('🔵 JWT Callback: Storing user data in token');
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.displayName = user.displayName;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      }

      // Si la session est mise à jour manuellement (après un refresh token)
      if (trigger === 'update' && session?.accessToken) {
        console.log('🔵 JWT Callback: Updating token from session');
        token.accessToken = session.accessToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log('🔵 Session Callback: Populating session from token');
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user.id = token.userId as string || '';
        session.user.email = token.email as string || '';
        session.user.firstName = token.firstName as string || '';
        session.user.lastName = token.lastName as string || '';
        session.user.displayName = token.displayName as string || '';
      }
      return session;
    },
    // Ce callback est crucial pour le proxy NextAuth
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      console.log('🔵 Authorized Callback:', {
        path: request.nextUrl.pathname,
        isLoggedIn
      });
      // Retourner true permet au proxy de gérer les redirections
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
