# -----------------------
# STAGE 1: Build
# -----------------------
FROM node:22-alpine AS builder

# Criar pasta da aplicação
WORKDIR /app

# Instalar ferramentas necessárias para builds de dependências nativas
RUN apk add --no-cache bash git python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências (somente prod seria instaladas depois)
RUN npm install

COPY prisma ./prisma/
COPY .env ./.env

RUN npx prisma generate

# Copiar o restante do código
COPY . .

# Gerar build (dist/)
RUN npm run build



# -----------------------
# STAGE 2: Run (produção)
# -----------------------
FROM node:22-alpine

WORKDIR /app

# Copiar somente arquivos necessários para rodar
COPY package*.json ./
RUN npm install --only=production

# Copiar build da stage anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
