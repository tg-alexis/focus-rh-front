import { z } from 'zod';

// ============= Authentication DTOs =============

export const LoginSchema = z.object({
  email: z.email('Votre email est requis'),
  password: z.string().min(1, 'Votre mot de passe est requis'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  phoneNumber: z.string().min(1, 'Numéro de téléphone requis'),
  accessCode: z.string().min(1, 'Code d\'accès requis'),
  startDay: z.enum(['monday', 'custom']).optional(),
  customStartDate: z.string().datetime().optional(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
});

export const RequestPasswordResetSchema = z.object({
  email: z.email('Votre email est requis'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  newPassword: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const RequestOtpSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const ChangePasswordWithOtpSchema = z.object({
  email: z.string().email('Email invalide'),
  otpCode: z.string().length(6, 'Le code OTP doit contenir 6 chiffres'),
  newPassword: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

// ============= Types =============

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
export type RequestPasswordResetDto = z.infer<typeof RequestPasswordResetSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type RequestOtpDto = z.infer<typeof RequestOtpSchema>;
export type ChangePasswordWithOtpDto = z.infer<typeof ChangePasswordWithOtpSchema>;

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  userId: string;
  email: string;
}
