# Multi-stage Dockerfile: Maximum Stability Edition
# Base: Debian Slim + npm Concurrency Limits

# Stage 1: Dependencies
FROM node:22-slim AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6-dev && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Anti-deadlock configuration for npm
RUN npm config set maxsockets 3 && \
    npm config set progress false && \
    npm install --frozen-lockfile --no-audit --no-fund

# Stage 2: Builder
FROM node:22-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Runner
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
