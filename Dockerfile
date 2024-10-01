# Etapa 1: Build da aplicação
FROM node:22-alpine3.18 AS build

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY src ./src

RUN pnpm run build

# Etapa 2: Configuração da imagem final
FROM node:22-alpine3.18

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=build /app/build ./build

EXPOSE 3003

CMD ["pnpm", "start", "build/app.js"]
