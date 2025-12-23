# Documentation d'Implémentation - Focus RH Front

## 🎯 Objectif

Intégration complète des routes **Users** et **Authentication** de l'API Focus RH avec Next.js 16, NextAuth v5, React Query et Axios.

## 📦 Technologies Utilisées

- **Next.js 16** - Framework React avec App Router
- **NextAuth v5 (beta)** - Authentification
- **React Query (TanStack Query)** - Gestion d'état serveur
- **Axios** - Client HTTP
- **Zod** - Validation de schémas
- **TypeScript** - Typage statique

## 🏗️ Structure du Projet

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Route handler NextAuth
│   └── layout.tsx                     # Layout principal avec providers
├── hooks/
│   ├── useAuth.ts                     # Hooks d'authentification
│   └── useUser.ts                     # Hooks utilisateurs
├── lib/
│   ├── api/
│   │   ├── axios.config.ts            # Configuration Axios + intercepteurs
│   │   └── services/
│   │       ├── auth.service.ts        # Service d'authentification
│   │       └── user.service.ts        # Service utilisateurs
│   ├── auth/
│   │   ├── auth.ts                    # Configuration NextAuth
│   │   └── auth.config.ts             # Config NextAuth (callbacks, pages)
│   └── providers/
│       ├── index.tsx                  # Providers wrapper
│       ├── query-provider.tsx         # React Query Provider
│       └── session-provider.tsx       # NextAuth Session Provider
└── types/
    ├── auth.types.ts                  # Types d'authentification
    ├── user.types.ts                  # Types utilisateurs
    └── next-auth.d.ts                 # Extension des types NextAuth
```

## 🔐 Authentication - Routes Implémentées

### 1. Login

```typescript
// Hook
const { mutate: login, isPending } = useLogin();

// Utilisation
login({ email: "user@example.com", password: "password" });
```

**Endpoint:** `POST /api/v1/auth/login`

### 2. Logout

```typescript
const { mutate: logout } = useLogout();
logout();
```

**Endpoint:** `POST /api/v1/auth/logout`

### 3. Refresh Token

```typescript
const { mutate: refreshToken } = useRefreshToken();
refreshToken();
```

**Endpoint:** `GET /api/v1/auth/refresh`

### 4. Verify Token

```typescript
const { data: tokenStatus } = useVerifyToken();
```

**Endpoint:** `POST /api/v1/auth/verify-token`

### 5. Password Reset Request

```typescript
const { mutate: requestReset } = useRequestPasswordReset();
requestReset({ email: "user@example.com" });
```

**Endpoint:** `POST /api/v1/auth/password-reset/request`

### 6. Password Reset Confirm

```typescript
const { mutate: resetPassword } = useResetPassword();
resetPassword({ token: "reset-token", newPassword: "NewP@ss123" });
```

**Endpoint:** `POST /api/v1/auth/password-reset/confirm`

### 7. Request OTP for Password Change

```typescript
const { mutate: requestOtp } = useRequestPasswordChangeOtp();
requestOtp({ email: "user@example.com", password: "currentPassword" });
```

**Endpoint:** `POST /api/v1/auth/password-change/request-otp`

### 8. Change Password with OTP

```typescript
const { mutate: changePassword } = useChangePasswordWithOtp();
changePassword({
	email: "user@example.com",
	otpCode: "123456",
	newPassword: "NewP@ss123",
});
```

**Endpoint:** `POST /api/v1/auth/password-change/confirm`

## 👤 Users - Routes Implémentées

### 1. Create User (Register)

```typescript
const { mutate: createUser } = useCreateUser();
createUser({
	email: "user@example.com",
	password: "password",
	firstName: "John",
	lastName: "Doe",
	phoneNumber: "+1234567890",
	accessCode: "ACCESS123",
	startDay: "monday",
});
```

**Endpoint:** `POST /api/v1/users`

### 2. Validate Access Code

```typescript
const { mutate: validateCode } = useValidateAccessCode();
validateCode({ accessCode: "ACCESS123" });
```

**Endpoint:** `POST /api/v1/users/validate-access-code`

### 3. Get Current User Profile

```typescript
const { data: profile, isLoading } = useProfile();
```

**Endpoint:** `GET /api/v1/users/me`

### 4. Update User Profile

```typescript
const { mutate: updateProfile } = useUpdateProfile();
updateProfile({
	displayName: "John Doe",
	preferences: {
		notifications: { email: true, push: true },
		theme: "dark",
		language: "fr",
	},
});
```

**Endpoint:** `PUT /api/v1/users/me`

### 5. Get User by ID

```typescript
const { data: user } = useUserById("user-id");
```

**Endpoint:** `GET /api/v1/users/{id}`

### 6. Deactivate User

```typescript
const { mutate: deactivate } = useDeactivateUser();
deactivate("user-id");
```

**Endpoint:** `PUT /api/v1/users/{id}/deactivate`

### 7. Create Admin User

```typescript
const { mutate: createAdmin } = useCreateAdmin();
createAdmin({
	email: "admin@example.com",
	firstName: "Admin",
	lastName: "User",
	phoneNumber: "+1234567890",
});
```

**Endpoint:** `POST /api/v1/users/admin`

### 8. Change Password

```typescript
const { mutate: changePassword } = useChangePassword();
changePassword({
	currentPassword: "oldPassword",
	newPassword: "newPassword",
});
```

**Endpoint:** `PUT /api/v1/users/me/change-password`

## 🔧 Configuration

### Variables d'Environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=https://focus-rh-api.amicale-solidarite.ovh/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Axios Interceptors

Les intercepteurs Axios ajoutent automatiquement :

- Le token d'authentification dans les headers
- La gestion des erreurs 401 (redirection vers login)

### NextAuth Configuration

- **Strategy:** JWT
- **Session Max Age:** 30 jours
- **Pages personnalisées:** Login, Error
- **Callbacks:** JWT et Session pour gérer les tokens

## 📝 Exemples d'Utilisation

### Page de Login

```typescript
"use client";

import { useLogin } from "@/hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { mutate: login, isPending } = useLogin();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" disabled={isPending}>
				{isPending ? "Connexion..." : "Se connecter"}
			</button>
		</form>
	);
}
```

### Page de Profil

```typescript
"use client";

import { useProfile, useUpdateProfile } from "@/hooks/useUser";

export default function ProfilePage() {
	const { data: profile, isLoading } = useProfile();
	const { mutate: updateProfile } = useUpdateProfile();

	if (isLoading) return <div>Chargement...</div>;

	return (
		<div>
			<h1>{profile?.displayName}</h1>
			<p>{profile?.email}</p>
			<button onClick={() => updateProfile({ displayName: "Nouveau nom" })}>
				Mettre à jour
			</button>
		</div>
	);
}
```

## 🎨 Features

✅ Authentification complète avec NextAuth v5  
✅ Gestion d'état serveur avec React Query  
✅ Validation des données avec Zod  
✅ Typage TypeScript complet  
✅ Intercepteurs Axios pour les tokens  
✅ Notifications toast (Sonner)  
✅ React Query DevTools en développement  
✅ Gestion automatique du cache  
✅ Retry automatique des requêtes

## 🚀 Prochaines Étapes

Pour utiliser ces fonctionnalités dans votre application :

1. Créer les pages d'authentification (login, register, reset-password)
2. Créer les pages de profil utilisateur
3. Ajouter les guards de routes pour protéger les pages
4. Implémenter les formulaires avec validation Zod
5. Personnaliser les messages d'erreur et de succès

## 📚 Ressources

- [NextAuth v5 Documentation](https://authjs.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Zod Documentation](https://zod.dev/)
