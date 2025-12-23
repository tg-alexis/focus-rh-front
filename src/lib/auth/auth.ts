import { LoginSchema } from '@/features/auth/schema/auth-schema';
import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://focus-rh-api.amicale-solidarite.ovh/api/v1';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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

          console.log('Login response:', JSON.stringify(response.data, null, 2));

          // Gérer différentes structures de réponse possibles
          let accessToken: string;
          let refreshToken: string;

          // Cas 1: tokens directement dans response.data
          if (response.data.accessToken && response.data.refreshToken) {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
          }
          // Cas 2: tokens dans response.data.data
          else if (response.data.data?.accessToken && response.data.data?.refreshToken) {
            accessToken = response.data.data.accessToken;
            refreshToken = response.data.data.refreshToken;
          }
          // Cas 3: tokens dans response.data.tokens
          else if (response.data.tokens?.accessToken && response.data.tokens?.refreshToken) {
            accessToken = response.data.tokens.accessToken;
            refreshToken = response.data.tokens.refreshToken;
          }
          else {
            console.error('Unable to find tokens in response:', response.data);
            return null;
          }

          console.log('Tokens extracted successfully');

          // Récupérer les informations de l'utilisateur
          const userResponse = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log('User response:', JSON.stringify(userResponse.data, null, 2));

          // Gérer différentes structures de réponse utilisateur
          const user = userResponse.data.data || userResponse.data;

          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          if (axios.isAxiosError(error)) {
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
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
