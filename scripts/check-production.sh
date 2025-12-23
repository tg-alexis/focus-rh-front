#!/bin/bash

echo "🔍 Vérification de la configuration de production..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteur d'erreurs
ERRORS=0

# Vérifier NEXTAUTH_SECRET
echo "📋 Vérification des variables d'environnement..."
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo -e "${RED}❌ NEXTAUTH_SECRET n'est pas défini${NC}"
    echo "   Générez-en un avec: openssl rand -base64 32"
    ERRORS=$((ERRORS+1))
else
    echo -e "${GREEN}✅ NEXTAUTH_SECRET est défini${NC}"
fi

# Vérifier NEXTAUTH_URL
if [ -z "$NEXTAUTH_URL" ]; then
    echo -e "${YELLOW}⚠️  NEXTAUTH_URL n'est pas défini${NC}"
    echo "   Définissez-le avec votre URL de production"
    echo "   Exemple: https://focus-rh.amicale-solidarite.ovh"
else
    echo -e "${GREEN}✅ NEXTAUTH_URL est défini: $NEXTAUTH_URL${NC}"
fi

# Vérifier NEXT_PUBLIC_API_URL
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
    echo -e "${YELLOW}⚠️  NEXT_PUBLIC_API_URL n'est pas défini${NC}"
    echo "   L'URL par défaut sera utilisée"
else
    echo -e "${GREEN}✅ NEXT_PUBLIC_API_URL est défini: $NEXT_PUBLIC_API_URL${NC}"
fi

echo ""
echo "📦 Vérification des fichiers..."

# Vérifier que proxy.ts existe
if [ -f "src/proxy.ts" ]; then
    echo -e "${GREEN}✅ src/proxy.ts existe${NC}"
else
    echo -e "${RED}❌ src/proxy.ts n'existe pas${NC}"
    ERRORS=$((ERRORS+1))
fi

# Vérifier que auth.ts existe
if [ -f "src/lib/auth/auth.ts" ]; then
    echo -e "${GREEN}✅ src/lib/auth/auth.ts existe${NC}"
else
    echo -e "${RED}❌ src/lib/auth/auth.ts n'existe pas${NC}"
    ERRORS=$((ERRORS+1))
fi

echo ""
echo "🔨 Test de build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${RED}❌ Build échoué${NC}"
    echo "   Exécutez 'npm run build' pour voir les erreurs"
    ERRORS=$((ERRORS+1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Tout est prêt pour la production !${NC}"
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) trouvée(s)${NC}"
    echo "   Corrigez les erreurs avant de déployer"
    exit 1
fi
