# Multi-stage Dockerfile optimized for GitHub Actions build + Coolify deploy
# Strategy: Overcome npm concurrency bugs while keeping the production image lightweight.

# ===================================
# Stage 1: Install Dependencies
# ===================================
FROM node:22-alpine AS deps
WORKDIR /app

# Required for sharp and other native modules on Alpine
RUN apk add --no-cache libc6-compat

COPY package*.json ./

# CRITICAL FIX: Update npm and use foreground-scripts to prevent "Exit handler never called" error.
RUN npm install -g npm@latest && \
    npm ci \
    --foreground-scripts \
    --no-audit \
    --no-fund

# ===================================
# Stage 2: Build Application
# ===================================
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy dependencies and package files from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy application source code
COPY . .

# Build settings
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application
RUN npm run build

# ===================================
# Stage 3: Production Runtime
# ===================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Restrict memory usage for the 2GB VPS
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apk add --no-cache libc6-compat dumb-init

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check for container stability
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
