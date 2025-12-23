import { userService } from '@/features/auth/api/user-service';
import type { ChangePasswordDto, RegisterDto } from '@/features/auth/schema/auth-schema';
import type {
  CreateAdminUserDto,
  UpdateUserProfileDto,
  ValidateAccessCodeDto,
} from '@/features/auth/schema/user-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const USER_QUERY_KEYS = {
  PROFILE: ['user', 'profile'] as const,
  BY_ID: (id: string) => ['user', id] as const,
  VALIDATE_ACCESS_CODE: ['user', 'validate-access-code'] as const,
};

/**
 * Hook pour créer un nouvel utilisateur
 */
export function useCreateUser() {
  return useMutation({
    mutationFn: (userData: RegisterDto) => userService.create(userData),
    onSuccess: () => {
      toast.success('Compte créé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la création du compte');
    },
  });
}

/**
 * Hook pour valider un code d'accès
 */
export function useValidateAccessCode() {
  return useMutation({
    mutationFn: (payload: ValidateAccessCodeDto) =>
      userService.validateAccessCode(payload),
  });
}

/**
 * Hook pour obtenir le profil de l'utilisateur connecté
 */
export function useProfile() {
  return useQuery({
    queryKey: USER_QUERY_KEYS.PROFILE,
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour mettre à jour le profil de l'utilisateur connecté
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserProfileDto) =>
      userService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.PROFILE });
      toast.success('Profil mis à jour avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la mise à jour du profil');
    },
  });
}

/**
 * Hook pour obtenir un utilisateur par ID
 */
export function useUserById(id: string) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.BY_ID(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour désactiver un utilisateur
 */
export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deactivate(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.BY_ID(id) });
      toast.success('Utilisateur désactivé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la désactivation');
    },
  });
}

/**
 * Hook pour créer un compte administrateur
 */
export function useCreateAdmin() {
  return useMutation({
    mutationFn: (payload: CreateAdminUserDto) =>
      userService.createAdmin(payload),
    onSuccess: () => {
      toast.success('Administrateur créé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec de la création de l\'administrateur');
    },
  });
}

/**
 * Hook pour changer son mot de passe
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordDto) =>
      userService.changePassword(payload),
    onSuccess: () => {
      toast.success('Mot de passe changé avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Échec du changement de mot de passe');
    },
  });
}
