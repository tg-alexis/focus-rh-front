FROM node:24.11.1-alpine3.21 as build

# Utiliser l'utilisateur root pour éviter les problèmes de permissions pendant la construction
USER root
WORKDIR /home/node

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN npm install -g pnpm
#RUN pnpm install --frozen-lockfile
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24.11.1-alpine3.21

# Utiliser l'utilisateur root pour éviter les problèmes de permissions pendant la copie
USER root
WORKDIR /home/node

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node --from=build /home/node/.next/standalone /app
COPY --chown=node:node --from=build /home/node/.next/static /app/.next/static
COPY --chown=node:node --from=build /home/node/public /app/public
RUN ls -la

# Exécuter le conteneur en tant qu'utilisateur node
USER node

ENV HOST=127.0.0.1
ENV NODE_ENV="production"
EXPOSE 3000

CMD [ "node", "server.js" ]