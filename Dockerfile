# Multi-stage Dockerfile optimized for VPS with limited resources (2GB RAM)
# Designed for Next.js standalone builds on Hetzner VPS via Coolify

# 1. Build Stage (Optimized for low memory consumption)
FROM node:20-alpine AS builder
WORKDIR /app

# Install system dependencies required for Alpine (sharp, native modules)
RUN apk add --no-cache libc6-compat

# Environment variables to limit memory usage during build
ENV NODE_OPTIONS="--max-old-space-size=1536"
ENV NPM_CONFIG_MAXSOCKETS=3
ENV NPM_CONFIG_FETCH_RETRIES=5
ENV NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000
ENV NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000

# Copy dependency files
COPY package*.json ./

# Install dependencies with memory optimization flags
# --prefer-offline: reduce concurrent downloads
# --no-audit: skip security audit (saves 100-200MB RAM)
# --progress=false: reduce logging overhead
RUN npm ci \
    --prefer-offline \
    --no-audit \
    --progress=false \
    && npm cache clean --force

# Copy source code
COPY . .

# Build with memory limitation
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2. Production Stage (Minimal runtime)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install libc6-compat for compatibility with sharp and native dependencies
RUN apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
