# STAGE 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app

# Debian setup for native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6-dev && \
    rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock* pnpm-lock.yaml* package-lock.json* ./

# Justo antes del npm ci o npm install
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Smart Detection - Stable version
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --no-audit --no-fund; \
  else npm install --no-audit --no-fund; \
  fi

# STAGE 2: Build the app
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else npm run build; \
  fi

# STAGE 3: Production Runner
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
# Protegiendo los 2GB de RAM de tu VPS
ENV NODE_OPTIONS="--max-old-space-size=384"

# Instalamos dumb-init para Debian
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Seguridad: Usuario sin privilegios
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
