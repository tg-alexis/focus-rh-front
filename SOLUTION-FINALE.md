# 🎯 Solution Finale - Problème d'authentification Production

## ❌ Problème initial

- **En local** : Redirection correcte vers login lors d'une erreur 401
- **En production** : Reste sur le dashboard malgré les erreurs 401, pas de déconnexion

## 🔍 Causes identifiées

### 1. Fichier `auth.config.ts` vide ❌

Le fichier était complètement vide mais importé dans `auth.ts`, causant une erreur silencieuse.

### 2. Flag `isRedirecting` jamais réinitialisé ❌

Une fois qu'une erreur 401 était détectée, le flag restait à `true` indéfiniment, bloquant toutes les futures redirections.

### 3. Manque de logs de debug ❌

Impossible de savoir ce qui se passait lors d'une erreur 401 en production.

### 4. Configuration `NEXTAUTH_URL` probablement incorrecte ❌

En production, cette variable doit pointer vers votre domaine de production, pas localhost.

## ✅ Solutions appliquées

### 1. Recréation de `auth.config.ts`

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

### 2. Amélioration de l'interceptor 401 dans `axios.config.ts`

```typescript
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			if (typeof window !== "undefined" && !isRedirecting) {
				isRedirecting = true;

				console.log("🔴 401 Unauthorized détecté - Déconnexion en cours...");

				try {
					// Nettoyer le cache local d'abord
					localStorage.clear();
					sessionStorage.clear();

					// Appeler l'API de déconnexion NextAuth
					await fetch("/api/auth/signout", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
					});

					console.log("✅ Déconnexion effectuée");
				} catch (e) {
					console.error("❌ Erreur lors de la déconnexion:", e);
				}

				// Redirection forcée vers la page de login
				console.log("🔄 Redirection vers login...");
				window.location.href = paths.auth.root;

				// ⚡ IMPORTANT: Réinitialiser le flag après 2 secondes
				setTimeout(() => {
					isRedirecting = false;
				}, 2000);
			}
		}

		return Promise.reject(error);
	}
);
```

### 3. Réimport de `authConfig` dans `auth.ts`

```typescript
import { authConfig } from "./auth.config";
```

### 4. Fichier `proxy.ts` maintenu

Next.js 16+ utilise `proxy.ts` au lieu de `middleware.ts`. Votre fichier était déjà correct.

## 🚀 Actions requises pour la production

### 1. Configurer les variables d'environnement ⚠️ CRITIQUE

Sur votre plateforme de déploiement (Vercel, Netlify, etc.), configurez :

```bash
NEXTAUTH_URL=https://votre-domaine-production.com
NEXTAUTH_SECRET=votre-secret-genere-avec-openssl
NEXT_PUBLIC_API_URL=https://focus-rh-api.amicale-solidarite.ovh/api/v1
NODE_ENV=production
```

### 2. Générer un secret sécurisé

```bash
openssl rand -base64 32
```

Utilisez ce secret pour `NEXTAUTH_SECRET` en production.

### 3. Redéployer l'application

Après avoir configuré les variables d'environnement, redéployez votre application.

## 🧪 Comment tester

### Test 1: Connexion/Déconnexion

1. Se connecter à l'application
2. Vérifier que vous êtes redirigé vers le dashboard
3. Cliquer sur déconnexion
4. Vérifier que vous êtes redirigé vers le login

### Test 2: Erreur 401 (Token expiré)

1. Se connecter à l'application
2. Ouvrir la console du navigateur (F12)
3. Attendre que le token expire OU modifier le token dans les DevTools
4. Faire une requête API (naviguer dans l'application)
5. Vérifier dans la console :
   ```
   🔴 401 Unauthorized détecté - Déconnexion en cours...
   ✅ Déconnexion effectuée
   🔄 Redirection vers login...
   ```
6. Vérifier que vous êtes redirigé vers le login

### Test 3: Protection des routes

1. Se déconnecter
2. Essayer d'accéder directement à `/dashboard`
3. Vérifier que vous êtes redirigé vers `/auth/login?callbackUrl=/dashboard`
4. Se connecter
5. Vérifier que vous êtes redirigé vers `/dashboard`

## 📊 Flux d'authentification complet

```
┌─────────────────────────────────────────────────────────────┐
│                    CONNEXION UTILISATEUR                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │  useLogin hook   │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ signIn('creds')  │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  authorize()     │
                  │  dans auth.ts    │
                  └────────┬─────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
        ┌──────────────┐      ┌──────────────┐
        │ POST /login  │      │ GET /users/me│
        │ (get tokens) │      │ (get user)   │
        └──────┬───────┘      └──────┬───────┘
               │                     │
               └──────────┬──────────┘
                          ▼
                 ┌─────────────────┐
                 │  jwt callback   │
                 │ (store in JWT)  │
                 └────────┬────────┘
                          │
                          ▼
                ┌──────────────────┐
                │ session callback │
                │ (expose to app)  │
                └────────┬─────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Redirect to     │
                │ /dashboard      │
                └─────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    REQUÊTE API AUTHENTIFIÉE                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │ axiosInstance    │
                  │ request intercep │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  getSession()    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Add Authorization│
                  │ Bearer token     │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  Send request    │
                  └────────┬─────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
         ┌────────────┐        ┌────────────┐
         │ 200 OK     │        │ 401 Error  │
         └────────────┘        └──────┬─────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │ response intercep│
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ isRedirecting?   │
                            └────────┬─────────┘
                                     │
                          ┌──────────┴──────────┐
                          ▼                     ▼
                    ┌──────────┐          ┌──────────┐
                    │   YES    │          │    NO    │
                    │  (skip)  │          │ (handle) │
                    └──────────┘          └─────┬────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │ isRedirecting=true│
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ Clear storage    │
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ POST /signout    │
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ window.location  │
                                      │ .href = /login   │
                                      └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ setTimeout(      │
                                      │  reset flag, 2s) │
                                      └──────────────────┘
```

## ✅ Checklist finale

### Avant déploiement

- [x] `auth.config.ts` recréé et fonctionnel
- [x] `auth.ts` importe correctement `authConfig`
- [x] `proxy.ts` présent et fonctionnel
- [x] `axios.config.ts` gère correctement les 401
- [x] Flag `isRedirecting` se réinitialise
- [x] Logs de debug ajoutés
- [x] Build réussi (`pnpm run build`)

### Configuration production

- [ ] `NEXTAUTH_URL` configuré avec l'URL de production
- [ ] `NEXTAUTH_SECRET` généré et configuré (différent de local)
- [ ] `NEXT_PUBLIC_API_URL` configuré
- [ ] `NODE_ENV=production` configuré

### Après déploiement

- [ ] Test de connexion réussi
- [ ] Test de déconnexion réussi
- [ ] Test d'erreur 401 → redirection vers login
- [ ] Vérification des logs dans la console navigateur
- [ ] Pas de boucles de redirection
- [ ] Protection des routes fonctionnelle

## 🆘 En cas de problème

### Problème: Boucle de redirection

**Cause:** Le flag `isRedirecting` ne se réinitialise pas
**Solution:** Vérifier que le `setTimeout` est bien présent dans `axios.config.ts`

### Problème: Session persiste après 401

**Cause:** Le cache n'est pas nettoyé ou `/api/auth/signout` échoue
**Solution:**

1. Vérifier les logs dans la console
2. Vérifier que `localStorage.clear()` et `sessionStorage.clear()` sont appelés
3. Vérifier que `/api/auth/signout` retourne 200

### Problème: NEXTAUTH_URL incorrect

**Cause:** Variable d'environnement mal configurée
**Solution:**

1. Vérifier dans les paramètres de votre plateforme de déploiement
2. L'URL doit être exacte : `https://votre-domaine.com` (sans slash final)
3. Redéployer après modification

### Problème: CORS en production

**Cause:** L'API backend n'autorise pas votre domaine de production
**Solution:** Contacter l'équipe backend pour ajouter votre domaine dans les CORS

## 📚 Documentation

- [NextAuth.js](https://next-auth.js.org/)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

## 🎉 Résultat attendu

Après ces modifications :

- ✅ En local ET en production, les erreurs 401 déconnectent automatiquement
- ✅ Redirection immédiate vers le login
- ✅ Nettoyage complet de la session et du cache
- ✅ Logs clairs pour le debug
- ✅ Pas de boucles de redirection
- ✅ Protection des routes fonctionnelle
