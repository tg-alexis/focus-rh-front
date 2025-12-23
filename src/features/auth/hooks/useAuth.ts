import { authService } from '@/features/auth/api/auth-service';
import type {
  ChangePasswordWithOtpDto,
  LoginDto,
  RequestOtpDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
} from '@/features/auth/schema/auth-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'sonner';

export const AUTH_QUERY_KEYS = {
  VERIFY_TOKEN: ['auth', 'verify-token'] as const,
};

/**
 * Hook pour la connexion utilisateur
 */
export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginDto) => {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success('Connexion réussie');
    },
    onError: () => {
// error: Error
      toast.error("Email ou mot de passe incorrect")
      // toast.error(error.message || 'Échec de la connexion');
    },
  });
}

/**
 * Hook pour la déconnexion utilisateur
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success('Déconnexion réussie');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la déconnexion');
    },
  });
}

/**
 * Hook pour vérifier si le token est valide
 */
export function useVerifyToken() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.VERIFY_TOKEN,
    queryFn: authService.verifyToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour demander une réinitialisation de mot de passe
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (payload: RequestPasswordResetDto) =>
      authService.requestPasswordReset(payload),
    onSuccess: () => {
      toast.success('Email de réinitialisation envoyé');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de l\'envoi de l\'email');
    },
  });
}

/**
 * Hook pour réinitialiser le mot de passe
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordDto) =>
      authService.resetPassword(payload),
    onSuccess: () => {
      toast.success('Mot de passe réinitialisé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la réinitialisation');
    },
  });
}

/**
 * Hook pour demander un OTP pour changer le mot de passe
 */
export function useRequestPasswordChangeOtp() {
  return useMutation({
    mutationFn: (payload: RequestOtpDto) =>
      authService.requestPasswordChangeOtp(payload),
    onSuccess: () => {
      toast.success('Code OTP envoyé par email');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de l\'envoi du code OTP');
    },
  });
}

/**
 * Hook pour changer le mot de passe avec un code OTP
 */
export function useChangePasswordWithOtp() {
  return useMutation({
    mutationFn: (payload: ChangePasswordWithOtpDto) =>
      authService.changePasswordWithOtp(payload),
    onSuccess: () => {
      toast.success('Mot de passe changé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec du changement de mot de passe');
    },
  });
}

/**
 * Hook pour rafraîchir le token
 */
export function useRefreshToken() {
  return useMutation({
    mutationFn: authService.refreshToken,
    onError: (error: Error) => {
      console.error('Token refresh failed:', error);
    },
  });
}
