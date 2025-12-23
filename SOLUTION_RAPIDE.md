# ⚡ Solution Rapide - Boucle Infinie en Production

## 🎯 Le Problème

Boucle infinie de redirections sur `https://focus-rh.amicale-solidarite.ovh`

## ✅ LA SOLUTION (5 minutes)

### 1️⃣ Générer un Secret (sur votre machine)

```bash
openssl rand -base64 32
```

**Copiez le résultat !** Exemple : `dGhpc2lzYXJhbmRvbXNlY3JldGtleQ==`

### 2️⃣ Ajouter les Variables d'Environnement

#### Sur Netlify :

1. Allez sur https://app.netlify.com
2. Sélectionnez votre site
3. **Site settings** → **Environment variables** → **Add a variable**
4. Ajoutez ces 3 variables :

```
NEXTAUTH_SECRET = [collez le secret généré à l'étape 1]
NEXTAUTH_URL = https://focus-rh.amicale-solidarite.ovh
NEXT_PUBLIC_API_URL = https://focus-rh-api.amicale-solidarite.ovh/api/v1
```

5. **Sauvegardez**

#### Sur Vercel :

1. Allez sur https://vercel.com
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**
4. Ajoutez les mêmes 3 variables
5. Cochez **Production**, **Preview**, et **Development**
6. **Save**

### 3️⃣ Redéployer

#### Netlify :

1. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

#### Vercel :

1. **Deployments** → Cliquez sur les 3 points → **Redeploy**

### 4️⃣ Tester (après 2-3 minutes)

1. **Videz le cache de votre navigateur** :

   - Chrome/Edge : `Ctrl + Shift + Delete` → Cochez "Cookies" et "Cached images"
   - Firefox : `Ctrl + Shift + Delete` → Cochez "Cookies" et "Cache"

2. **Ouvrez la console** : `F12` ou `Ctrl + Shift + I`

3. **Accédez à votre site** : https://focus-rh.amicale-solidarite.ovh

4. **Vérifiez les logs** dans la console :
   - Vous devriez voir : `🔵 Proxy: { path: '/', isLoggedIn: false }`
   - Puis : `🔄 Root: Redirection vers auth (non connecté)`
   - Vous serez redirigé vers `/auth` (page de connexion)

## ✅ Ça Marche ?

Si vous voyez la page de connexion sans boucle infinie : **SUCCÈS !** 🎉

## ❌ Ça ne Marche Toujours Pas ?

### Vérification 1 : Les Variables Sont-Elles Bien Définies ?

#### Netlify :

```bash
# Dans le terminal de votre machine
netlify env:list
```

#### Vercel :

```bash
# Dans le terminal de votre machine
vercel env ls
```

### Vérification 2 : Les Cookies

1. Ouvrez DevTools (`F12`)
2. **Application** (Chrome) ou **Storage** (Firefox)
3. **Cookies** → Votre domaine
4. Cherchez `next-auth.session-token` ou `__Secure-next-auth.session-token`

**Si absent après login** = Problème de cookies/session

### Vérification 3 : HTTPS

Votre site DOIT être en HTTPS (avec le cadenas 🔒).
Si ce n'est pas le cas, les cookies sécurisés ne fonctionneront pas.

## 🆘 Aide Supplémentaire

Si rien ne fonctionne, partagez :

1. Les logs de la console navigateur (screenshot)
2. Les logs de déploiement de votre plateforme
3. La liste de vos variables d'environnement (sans les valeurs secrètes !)

## 📚 Documentation Complète

Pour plus de détails, consultez :

- `BOUCLE_INFINIE_FIX.md` - Guide détaillé
- `PRODUCTION_SETUP.md` - Configuration complète de production
