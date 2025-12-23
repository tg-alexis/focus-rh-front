import type { ChangePasswordDto, RegisterDto } from '@/features/auth/schema/auth-schema';
import type {
  CreateAdminUserDto,
  UpdateUserProfileDto,
  User,
  ValidateAccessCodeDto,
  ValidateAccessCodeResponse,
} from '@/features/auth/schema/user-schema';
import axiosInstance from '../../../lib/api/axios.config';

const USER_ENDPOINTS = {
  CREATE: '/users',
  VALIDATE_ACCESS_CODE: '/users/validate-access-code',
  ME: '/users/me',
  BY_ID: (id: string) => `/users/${id}`,
  DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
  CREATE_ADMIN: '/users/admin',
  CHANGE_PASSWORD: '/users/me/change-password',
};

export const userService = {
  /**
   * Créer un nouvel utilisateur
   */
  async create(userData: RegisterDto): Promise<User> {
    const { data } = await axiosInstance.post<User>(
      USER_ENDPOINTS.CREATE,
      userData
    );
    return data;
  },

  /**
   * Valider un code d'accès
   */
  async validateAccessCode(
    payload: ValidateAccessCodeDto
  ): Promise<ValidateAccessCodeResponse> {
    const { data } = await axiosInstance.post<ValidateAccessCodeResponse>(
      USER_ENDPOINTS.VALIDATE_ACCESS_CODE,
      payload
    );
    return data;
  },

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  async getProfile(): Promise<User> {
    const { data } = await axiosInstance.get<User>(USER_ENDPOINTS.ME);
    return data;
  },

  /**
   * Mettre à jour le profil de l'utilisateur connecté
   */
  async updateProfile(payload: UpdateUserProfileDto): Promise<User> {
    const { data } = await axiosInstance.put<User>(
      USER_ENDPOINTS.ME,
      payload
    );
    return data;
  },

  /**
   * Obtenir un utilisateur par ID
   */
  async getById(id: string): Promise<User> {
    const { data } = await axiosInstance.get<User>(
      USER_ENDPOINTS.BY_ID(id)
    );
    return data;
  },

  /**
   * Désactiver un utilisateur
   */
  async deactivate(id: string): Promise<void> {
    await axiosInstance.put(USER_ENDPOINTS.DEACTIVATE(id));
  },

  /**
   * Créer un compte administrateur (Admin uniquement)
   */
  async createAdmin(payload: CreateAdminUserDto): Promise<void> {
    await axiosInstance.post(USER_ENDPOINTS.CREATE_ADMIN, payload);
  },

  /**
   * Changer son mot de passe
   */
  async changePassword(payload: ChangePasswordDto): Promise<void> {
    await axiosInstance.put(USER_ENDPOINTS.CHANGE_PASSWORD, payload);
  },
};
