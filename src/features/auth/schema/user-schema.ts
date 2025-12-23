import { z } from 'zod';

// ============= User DTOs =============

export const ValidateAccessCodeSchema = z.object({
  accessCode: z.string().min(1, 'Code d\'accès requis'),
});

export const UpdateUserProfileSchema = z.object({
  displayName: z.string().optional(),
  preferences: z.object({
    notifications: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      sms: z.boolean().optional(),
      dailyReminderTime: z.string().optional(),
    }).optional(),
    theme: z.enum(['light', 'dark', 'auto']).optional(),
    language: z.string().optional(),
  }).optional(),
});

export const CreateAdminUserSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  phoneNumber: z.string().min(1, 'Numéro de téléphone requis'),
});

// ============= Types =============

export type ValidateAccessCodeDto = z.infer<typeof ValidateAccessCodeSchema>;
export type UpdateUserProfileDto = z.infer<typeof UpdateUserProfileSchema>;
export type CreateAdminUserDto = z.infer<typeof CreateAdminUserSchema>;

export interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
  dailyReminderTime?: string;
}

export interface UserPreferences {
  notifications?: NotificationPreferences;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  displayName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  startDay: string;
  customStartDate?: string;
  preferences?: UserPreferences;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateAccessCodeResponse {
  isValid: boolean;
  canBeUsed: boolean;
  remainingUsages?: number;
  expiresAt?: string;
  message?: string;
}
