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
  },
  providers: [],
} satisfies NextAuthConfig;
