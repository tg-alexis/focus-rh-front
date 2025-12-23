# 🚀 Configuration Production - Focus RH

## ⚠️ Variables d'Environnement Requises

Pour que l'application fonctionne correctement en production, vous DEVEZ définir les variables suivantes :

### 1. NEXTAUTH_SECRET (OBLIGATOIRE)

```bash
NEXTAUTH_SECRET=votre-secret-super-long-et-aleatoire-ici
```

**Comment générer un secret sécurisé :**

```bash
openssl rand -base64 32
```

### 2. NEXTAUTH_URL (OBLIGATOIRE en production)

```bash
NEXTAUTH_URL=https://focus-rh.amicale-solidarite.ovh
```

### 3. API URL

```bash
NEXT_PUBLIC_API_URL=https://focus-rh-api.amicale-solidarite.ovh/api/v1
```

## 📋 Checklist de Déploiement

### Étape 1 : Variables d'Environnement

- [ ] Ajouter `NEXTAUTH_SECRET` dans votre plateforme de déploiement (Vercel/Netlify/etc)
- [ ] Ajouter `NEXTAUTH_URL` avec l'URL complète de votre site
- [ ] Vérifier `NEXT_PUBLIC_API_URL`

### Étape 2 : Build

```bash
npm run build
```

### Étape 3 : Vérifier les Erreurs

- [ ] Pas d'erreurs de build
- [ ] Tous les fichiers sont générés dans `.next/`

### Étape 4 : Test Local de Production

```bash
npm run start
```

## 🔧 Problèmes Courants

### Boucle Infinie de Redirections

**Cause 1 : NEXTAUTH_SECRET manquant**

- Symptôme : Redirections infinies entre `/` et `/auth`
- Solution : Ajouter `NEXTAUTH_SECRET` dans les variables d'environnement

**Cause 2 : NEXTAUTH_URL incorrect**

- Symptôme : Session non persistante, déconnexion automatique
- Solution : Vérifier que `NEXTAUTH_URL` correspond exactement à votre domaine

**Cause 3 : Cookies bloqués**

- Symptôme : Session ne se sauvegarde pas
- Solution : Vérifier les paramètres de cookies dans `auth.ts`

### Erreur "Email et mot de passe incorrect"

**Cause : Structure de réponse API différente**

- Regardez les logs de la console
- Vérifiez la structure dans `🔵 Login API Response`
- Le code gère déjà 3 structures possibles

## 🌐 Configuration Netlify/Vercel

### Netlify

1. Allez dans **Site settings** → **Environment variables**
2. Ajoutez :
   - `NEXTAUTH_SECRET` = [votre secret généré]
   - `NEXTAUTH_URL` = https://focus-rh.amicale-solidarite.ovh
   - `NEXT_PUBLIC_API_URL` = https://focus-rh-api.amicale-solidarite.ovh/api/v1

### Vercel

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez les mêmes variables que ci-dessus
3. Cochez **Production**, **Preview**, et **Development**

## 🔍 Debugging en Production

### Activer les Logs

Les logs sont déjà activés dans le code. Pour les voir en production :

1. Ouvrez la console du navigateur (F12)
2. Regardez les logs préfixés par 🔵, ✅, ou ❌

### Logs Importants

- `🔵 Proxy:` - Chaque requête qui passe par le proxy
- `🔵 Login API Response:` - Réponse de l'API de login
- `🔵 JWT Callback:` - Stockage des données utilisateur
- `🔵 Session Callback:` - Récupération de la session

## 📞 Support

Si le problème persiste après avoir suivi ce guide :

1. Vérifiez les logs de la console navigateur
2. Vérifiez les logs de votre plateforme de déploiement
3. Partagez les logs pour diagnostic
