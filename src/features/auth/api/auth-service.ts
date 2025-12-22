import type {
  AuthResponse,
  ChangePasswordWithOtpDto,
  LoginDto,
  LogoutResponse,
  RequestOtpDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
  VerifyTokenResponse
} from '@/features/auth/schema/auth-schema';
import axiosInstance from '../../../lib/api/axios.config';
import { AUTH_ENDPOINTS } from '../routes';



export const authService = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return data;
  },

  /**
   * Déconnexion utilisateur
   */
  async logout(): Promise<LogoutResponse> {
    const { data } = await axiosInstance.post<LogoutResponse>(
      AUTH_ENDPOINTS.LOGOUT
    );
    return data;
  },

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken(): Promise<AuthResponse> {
    const { data } = await axiosInstance.get<AuthResponse>(
      AUTH_ENDPOINTS.REFRESH
    );
    return data;
  },

  /**
   * Vérifier si le token est valide
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    const { data } = await axiosInstance.post<VerifyTokenResponse>(
      AUTH_ENDPOINTS.VERIFY_TOKEN
    );
    return data;
  },

  /**
   * Demander une réinitialisation de mot de passe
   */
  async requestPasswordReset(
    payload: RequestPasswordResetDto
  ): Promise<void> {
    await axiosInstance.post(AUTH_ENDPOINTS.PASSWORD_RESET_REQUEST, payload);
  },

  /**
   * Réinitialiser le mot de passe
   */
  async resetPassword(payload: ResetPasswordDto): Promise<void> {
    await axiosInstance.post(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, payload);
  },

  /**
   * Demander un OTP pour changer le mot de passe (première connexion)
   */
  async requestPasswordChangeOtp(payload: RequestOtpDto): Promise<void> {
    await axiosInstance.post(
      AUTH_ENDPOINTS.PASSWORD_CHANGE_REQUEST_OTP,
      payload
    );
  },

  /**
   * Changer le mot de passe avec un code OTP
   */
  async changePasswordWithOtp(
    payload: ChangePasswordWithOtpDto
  ): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.PASSWORD_CHANGE_CONFIRM,
      payload
    );
    return data;
  },
};
