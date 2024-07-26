# Etapa 1: Build da aplicação
FROM node:22-alpine3.18 AS build

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

# Etapa 2: Configuração da imagem final
FROM node:22-alpine3.18

WORKDIR /app

COPY package.json .env ./

RUN npm install --prod

# Copia os arquivos da imagem criada na  primeira etapa para /app/build da imagem final
COPY --from=build /app/build ./build

EXPOSE 3003

CMD [ "npm", "run", "start" ]
