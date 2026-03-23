# STAGE 1: Install dependencies
FROM node:20-slim AS deps

WORKDIR /app

# Dependencias necesarias para módulos nativos
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Activar pnpm
RUN corepack enable
RUN corepack prepare pnpm@9 --activate

COPY package.json package-lock.json ./

# Convertir lockfile npm -> pnpm automáticamente
RUN pnpm import

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Verificar binarios instalados
RUN ls -la node_modules/.bin

# STAGE 2: Build
FROM node:20-slim AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm build

# STAGE 3: Runner
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
