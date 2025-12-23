# ====== BUILD STAGE ======
FROM node:22-alpine AS build

# Installer pnpm global
RUN npm install -g pnpm

WORKDIR /app

# Copier uniquement les fichiers nécessaires au cache
COPY package.json pnpm-lock.yaml ./

# Installer dépendances en mode reproductible
RUN pnpm install --frozen-lockfile

# Copier tout le reste du code
COPY . .

# Build Next.js en standalone
RUN pnpm build

FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copier uniquement le standalone + static + public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

# Bonne pratique recommandée par Next.js
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]