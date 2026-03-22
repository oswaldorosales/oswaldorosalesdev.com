# Multi-stage Dockerfile: Using Debian Slim for maximum stability during build
# and execution on a resource-constrained VPS.

# ===================================
# Stage 1: Install Dependencies
# ===================================
FROM node:22-slim AS deps
WORKDIR /app

# Debian needs some basic tools for native builds, but usually less than Alpine
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Stability flags for npm
RUN npm ci \
    --no-audit \
    --no-fund \
    --network-timeout=100000

# ===================================
# Stage 2: Build Application
# ===================================
FROM node:22-slim AS builder
WORKDIR /app

# Copy dependencies and package files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js
RUN npm run build

# ===================================
# Stage 3: Production Runtime
# ===================================
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=384"

# Use dumb-init for proper signal handling
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Security: Non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
