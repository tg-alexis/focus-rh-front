# Fix Authentification Production

## Problème

En local, l'application redirige correctement vers le login, mais en production :

- L'utilisateur reste sur le dashboard même avec des erreurs 401
- Les appels API retournent 401 mais la déconnexion ne se fait pas
- La session NextAuth reste valide alors que le token API est expiré

## Causes identifiées

1. **Session JWT persistante** : La session NextAuth (30 jours) reste valide même si le token API est expiré
2. **Pas de validation du token** : Le callback JWT ne vérifiait pas si le token était toujours valide côté API
3. **NEXTAUTH_URL incorrect** : En production, cette variable doit pointer vers le domaine de production, pas localhost

## Solutions implémentées

### 1. Validation du token dans `auth.config.ts`

Ajout d'une validation du token à chaque requête dans le callback JWT :

```typescript
async jwt({ token, user, trigger }) {
  // ... stockage des données utilisateur ...

  // Valider le token à chaque requête (sauf lors du login initial)
  if (token.accessToken && trigger !== 'signIn') {
    try {
      await axios.get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token.accessToken}` },
        timeout: 5000,
      });
    } catch (error) {
      console.error('Token validation failed:', error);
      return null; // Invalide la session
    }
  }

  return token;
}
```

### 2. Middleware d'authentification

Création de `/src/middleware.ts` pour gérer les redirections au niveau de l'application :

```typescript
export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	// Redirection vers login si non connecté sur page protégée
	if (isDashboardPage && !isLoggedIn) {
		return NextResponse.redirect(new URL(paths.auth.root, nextUrl));
	}

	// Redirection vers dashboard si connecté sur page auth
	if (isAuthPage && isLoggedIn) {
		return NextResponse.redirect(new URL(paths.core.dashboard, nextUrl));
	}

	return NextResponse.next();
});
```

### 3. Amélioration de la gestion des 401 dans `axios.config.ts`

Amélioration du flux de déconnexion lors d'une erreur 401 :

```typescript
if (error.response?.status === 401) {
	if (typeof window !== "undefined" && !isRedirecting) {
		isRedirecting = true;

		try {
			// 1. Nettoyer le cache local
			localStorage.clear();
			sessionStorage.clear();

			// 2. Appeler l'API de déconnexion
			await fetch("/api/auth/signout", { method: "POST" });

			// 3. Attendre que la déconnexion soit effective
			await new Promise((resolve) => setTimeout(resolve, 100));
		} finally {
			// 4. Redirection forcée
			window.location.href = paths.auth.root;
		}
	}
}
```

## Configuration requise pour la production

### Variables d'environnement

**CRITIQUE** : Vous devez configurer `NEXTAUTH_URL` avec l'URL de production dans vos variables d'environnement :

```bash
# En production
NEXTAUTH_URL=https://votre-domaine-production.com
NEXTAUTH_SECRET=votre-secret-genere-avec-openssl

# En local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-genere-avec-openssl
```

### Générer un secret sécurisé

```bash
openssl rand -base64 32
```

## Déploiement

1. **Mettre à jour les variables d'environnement** sur votre plateforme de déploiement (Vercel, Netlify, etc.)
2. **Redéployer l'application** avec les nouveaux changements
3. **Tester** :
   - Connexion/déconnexion
   - Expiration du token (attendre ou forcer une erreur 401)
   - Vérifier que la redirection vers login fonctionne

## Vérifications post-déploiement

- [ ] `NEXTAUTH_URL` est configuré avec l'URL de production
- [ ] `NEXTAUTH_SECRET` est généré et configuré
- [ ] Les erreurs 401 déconnectent et redirigent vers login
- [ ] La session expire correctement quand le token API est invalide
- [ ] Pas de boucles de redirection

## Notes importantes

- La validation du token ajoute un appel API à chaque requête NextAuth, mais c'est nécessaire pour la sécurité
- Le timeout de 5 secondes évite de bloquer l'application si l'API est lente
- Le flag `isRedirecting` évite les redirections multiples simultanées
