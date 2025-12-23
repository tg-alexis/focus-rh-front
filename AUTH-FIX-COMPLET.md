# Fix Complet Authentification - Production vs Local

## 🔍 Problèmes identifiés et corrigés

### 1. ❌ `auth.config.ts` était vide

**Problème:** Le fichier était complètement vide mais importé dans `auth.ts`
**Solution:** Recréé avec la configuration NextAuth complète

### 2. ❌ Fichier `proxy.ts` au lieu de `middleware.ts`

**Problème:** Next.js cherche `middleware.ts` à la racine de `src/`, pas `proxy.ts`
**Solution:** Renommé `proxy.ts` → `middleware.ts`

### 3. ❌ Flag `isRedirecting` jamais réinitialisé

**Problème:** Une fois à `true`, il bloquait toutes les futures redirections
**Solution:** Ajout d'un `setTimeout` pour le réinitialiser après 2 secondes

### 4. ❌ Manque de logs pour debug

**Problème:** Impossible de savoir ce qui se passe lors d'un 401
**Solution:** Ajout de logs avec emojis pour tracer le flux

## 📁 Fichiers modifiés

### 1. `/src/lib/auth/auth.config.ts` ✅

```typescript
import { paths } from "@/paths";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: paths.auth.root,
		error: "/auth/error",
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
				session.user.id = token.userId || "";
				session.user.email = token.email || "";
				session.user.firstName = token.firstName || "";
				session.user.lastName = token.lastName || "";
				session.user.displayName = token.displayName || "";
			}
			return session;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
```

### 2. `/src/lib/auth/auth.ts` ✅

- Réimporté `authConfig` qui était manquant

### 3. `/src/middleware.ts` (renommé depuis proxy.ts) ✅

- Protège les routes `/dashboard`, `/daily-task`, `/pillars`, `/admin`
- Redirige vers login avec `callbackUrl` si non connecté
- Redirige vers dashboard si connecté sur page auth

### 4. `/src/lib/api/axios.config.ts` ✅

```typescript
// Response interceptor amélioré
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			if (typeof window !== "undefined" && !isRedirecting) {
				isRedirecting = true;

				console.log("🔴 401 Unauthorized détecté - Déconnexion en cours...");

				try {
					// 1. Nettoyer le cache
					localStorage.clear();
					sessionStorage.clear();

					// 2. Appeler l'API de déconnexion
					await fetch("/api/auth/signout", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
					});

					console.log("✅ Déconnexion effectuée");
				} catch (e) {
					console.error("❌ Erreur lors de la déconnexion:", e);
				}

				// 3. Redirection forcée
				console.log("🔄 Redirection vers login...");
				window.location.href = paths.auth.root;

				// 4. Réinitialiser le flag après 2 secondes
				setTimeout(() => {
					isRedirecting = false;
				}, 2000);
			}
		}

		return Promise.reject(error);
	}
);
```

## 🔧 Configuration requise

### Variables d'environnement (CRITIQUE)

Vous DEVEZ configurer ces variables sur votre plateforme de déploiement :

```bash
# Production
NEXTAUTH_URL=https://votre-domaine-production.com
NEXTAUTH_SECRET=votre-secret-genere
NEXT_PUBLIC_API_URL=https://focus-rh-api.amicale-solidarite.ovh/api/v1

# Local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-genere
NEXT_PUBLIC_API_URL=https://focus-rh-api.amicale-solidarite.ovh/api/v1
```

### Générer un secret sécurisé

```bash
openssl rand -base64 32
```

## 🧪 Comment tester

### En local

1. Démarrer l'application : `pnpm dev`
2. Se connecter
3. Ouvrir la console du navigateur
4. Forcer une erreur 401 (modifier le token dans les DevTools ou attendre l'expiration)
5. Vérifier les logs :
   - 🔴 401 Unauthorized détecté
   - ✅ Déconnexion effectuée
   - 🔄 Redirection vers login

### En production

1. Vérifier que `NEXTAUTH_URL` est configuré avec l'URL de production
2. Déployer l'application
3. Se connecter
4. Attendre l'expiration du token ou forcer une erreur 401
5. Vérifier que vous êtes redirigé vers le login

## 🎯 Flux d'authentification complet

### Connexion

1. Utilisateur entre email/password
2. `useLogin()` appelle `signIn('credentials')`
3. NextAuth appelle `authorize()` dans `auth.ts`
4. Appel API `/auth/login` → récupère tokens
5. Appel API `/users/me` → récupère infos utilisateur
6. Callback `jwt()` stocke les données dans le token JWT
7. Callback `session()` expose les données à l'application
8. Redirection vers dashboard

### Requête API authentifiée

1. `axiosInstance` intercepte la requête
2. Récupère la session avec `getSession()`
3. Ajoute le header `Authorization: Bearer ${token}`
4. Envoie la requête

### Erreur 401 (Token expiré)

1. `axiosInstance` intercepte la réponse 401
2. Vérifie `!isRedirecting` pour éviter les boucles
3. Met `isRedirecting = true`
4. Nettoie localStorage et sessionStorage
5. Appelle `/api/auth/signout` pour invalider la session NextAuth
6. Redirige vers login avec `window.location.href`
7. Réinitialise `isRedirecting` après 2 secondes

### Déconnexion manuelle

1. Utilisateur clique sur "Déconnexion"
2. `useLogout()` appelle `authService.logout()` (API backend)
3. Puis appelle `signOut({ redirect: false })` (NextAuth)
4. Nettoie le cache React Query
5. Redirection manuelle vers login

### Protection des routes (middleware)

1. Chaque requête passe par `middleware.ts`
2. Vérifie si l'utilisateur a une session (`req.auth`)
3. Si page protégée + non connecté → redirige vers login
4. Si page auth + connecté → redirige vers dashboard

## ⚠️ Points d'attention

### En production

- **NEXTAUTH_URL** doit être l'URL exacte de production (avec https://)
- **NEXTAUTH_SECRET** doit être différent de celui en local
- Vérifier les logs de la console navigateur pour les erreurs 401

### Durée de vie des tokens

- Session NextAuth : 30 jours (configurable dans `auth.ts`)
- Token API : selon votre backend (vérifier avec l'équipe backend)
- Si le token API expire avant la session NextAuth, vous aurez des 401

### Problèmes potentiels

1. **Boucle de redirection** : Si `isRedirecting` ne se réinitialise pas
2. **Session persistante** : Si le cache n'est pas nettoyé correctement
3. **CORS** : Si l'API backend n'autorise pas votre domaine de production

## 🔍 Debug

### Vérifier la session

```typescript
// Dans un composant client
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
console.log("Session:", session);
console.log("Status:", status); // 'loading' | 'authenticated' | 'unauthenticated'
```

### Vérifier le token

```typescript
// Dans un composant serveur
import { auth } from "@/lib/auth/auth";

const session = await auth();
console.log("Access Token:", session?.accessToken);
```

### Logs de l'interceptor

Ouvrez la console du navigateur et cherchez :

- 🔴 401 Unauthorized détecté
- ✅ Déconnexion effectuée
- 🔄 Redirection vers login
- ❌ Erreur lors de la déconnexion

## ✅ Checklist de déploiement

- [ ] `NEXTAUTH_URL` configuré avec l'URL de production
- [ ] `NEXTAUTH_SECRET` généré et configuré
- [ ] `NEXT_PUBLIC_API_URL` configuré
- [ ] Fichier `middleware.ts` présent à la racine de `src/`
- [ ] Fichier `auth.config.ts` non vide
- [ ] Tests en local réussis
- [ ] Déploiement effectué
- [ ] Tests en production réussis
- [ ] Erreurs 401 déconnectent et redirigent correctement
- [ ] Pas de boucles de redirection
