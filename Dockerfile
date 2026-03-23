# STAGE 1: Install dependencies
FROM node:20-slim AS deps

WORKDIR /app

# Dependencias para módulos nativos
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Actualizar npm (soluciona bug "Exit handler never called")
RUN npm install -g npm@11

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund

# Verificar que los binarios se instalaron correctamente
RUN ls -la node_modules/.bin

# STAGE 2: Build the app
FROM node:20-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# STAGE 3: Production runner
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=384"

# Instalar dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Usuario sin privilegios
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
