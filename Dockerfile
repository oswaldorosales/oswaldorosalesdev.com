# Multi-stage Dockerfile optimized for GitHub Actions build + Coolify deploy
# Built in GitHub Actions (7GB RAM), deployed to 2GB VPS via GHCR

# ===================================
# Stage 1: Install Dependencies
# ===================================
FROM node:22-alpine AS deps
WORKDIR /app

# Required for sharp and other native modules on Alpine
RUN apk add --no-cache libc6-compat

COPY package*.json ./

# Install all dependencies (GitHub Actions has plenty of resources)
RUN npm ci

# ===================================
# Stage 2: Build Application
# ===================================
FROM node:22-alpine AS builder
WORKDIR /app

# Required for sharp during build
RUN apk add --no-cache libc6-compat

# Copy dependencies and package files from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy application source code
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application (uses all available GitHub Actions resources)
RUN npm run build

# ===================================
# Stage 3: Production Runtime
# ===================================
# Minimal image for running on resource-constrained VPS (2GB RAM)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Limit Node.js heap to 384MB (sufficient for Next.js standalone mode)
ENV NODE_OPTIONS="--max-old-space-size=384"

# libc6-compat: Required for sharp in production
# dumb-init: Proper signal handling for containerized Node.js
RUN apk add --no-cache libc6-compat dumb-init

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only production files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check for Coolify and container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init as PID 1 for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
