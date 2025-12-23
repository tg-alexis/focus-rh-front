import { paths } from '@/paths';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: paths.auth.root,
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('🔵 JWT Callback: Storing user data in token');
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.displayName = user.displayName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log('🔵 Session Callback: Populating session from token');
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
