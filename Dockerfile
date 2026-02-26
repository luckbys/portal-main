# ============================================
# STAGE 1: Build da aplicação
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências primeiro (cache de camadas)
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Variáveis de ambiente para o build (opcional)
ARG GEMINI_API_KEY=""
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Gera o build de produção
RUN npm run build

# ============================================
# STAGE 2: Servidor de produção com Nginx
# ============================================
FROM nginx:1.27-alpine AS production

# Remove a config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build da aplicação para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Healthcheck simples
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

# Inicia o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
