# 🔧 Solution au problème CORS

## 📋 Problème identifié

Les appels API depuis le navigateur vers `https://focus-rh-api.amicale-solidarite.ovh` étaient bloqués par la politique CORS (Cross-Origin Resource Sharing).

## ✅ Solution implémentée : Proxy Next.js

### 1. Configuration Next.js (`next.config.ts`)

Ajout d'un système de **rewrites** qui agit comme un proxy :

```typescript
async rewrites() {
  return [
    {
      source: '/api/proxy/:path*',
      destination: 'https://focus-rh-api.amicale-solidarite.ovh/api/v1/:path*',
    },
  ];
}
```

**Comment ça fonctionne :**

- Toutes les requêtes vers `/api/proxy/*` sont redirigées vers l'API backend
- Le proxy s'exécute côté serveur Next.js, donc pas de problème CORS
- Le navigateur pense faire des appels vers le même domaine

### 2. Configuration Axios (`src/lib/api/axios.config.ts`)

Modification de la `baseURL` pour utiliser le proxy :

```typescript
const API_BASE_URL =
	typeof window !== "undefined"
		? "/api/proxy" // Côté client : utiliser le proxy Next.js
		: process.env.NEXT_PUBLIC_API_URL ||
		  "https://focus-rh-api.amicale-solidarite.ovh/api/v1";
```

**Avantages :**

- ✅ Plus de problèmes CORS
- ✅ Les tokens d'authentification restent sécurisés
- ✅ Pas besoin de modifier le backend
- ✅ Fonctionne en développement et en production

## 🚀 Pour tester

1. **Redémarrez le serveur de développement :**

   ```bash
   npm run dev
   ```

2. **Vérifiez dans la console du navigateur :**

   - Les requêtes doivent maintenant pointer vers `/api/proxy/...`
   - Plus d'erreurs CORS

3. **Testez les fonctionnalités :**
   - Connexion
   - Récupération des données du dashboard
   - Soumission de l'évaluation hebdomadaire

## 📝 Notes importantes

- Le proxy fonctionne automatiquement en développement
- En production, Next.js gère également les rewrites
- Les headers d'authentification sont toujours envoyés correctement
- `withCredentials: false` évite les problèmes de cookies cross-origin

## 🔄 Alternative (si le proxy ne suffit pas)

Si vous avez toujours des problèmes, demandez au backend d'ajouter ces headers CORS :

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

Mais avec le proxy Next.js, **ce n'est normalement pas nécessaire** ! 🎉
