# Etapa 1: Build da aplicação
FROM node:22-alpine3.18 AS build

WORKDIR /app

COPY package.json tsconfig.json ./

# Instale o pnpm globalmente
RUN npm install -g pnpm

RUN pnpm install

COPY src ./src

RUN pnpm run build

# Etapa 2: Configuração da imagem final
FROM node:22-alpine3.18

WORKDIR /app

COPY package.json ./

# Instale o pnpm globalmente também aqui
RUN npm install -g pnpm

RUN pnpm install pm2

RUN pnpm install --prod

# Copia os arquivos da imagem criada na primeira etapa para /app/build da imagem final
COPY --from=build /app/build ./build

EXPOSE 3003

CMD ["npx", "pm2", "start", "build/app.js", "--name", "financial-api"]
