# Multi-stage Dockerfile ULTRA-OPTIMIZED for 2GB RAM VPS
# Strategy: Install dependencies in STAGES to avoid memory spikes
# Designed for Next.js standalone builds on Hetzner VPS via Coolify

# ===================================
# Stage 1: Production Dependencies Only
# ===================================
FROM node:20-alpine AS deps-prod
WORKDIR /app

# Install minimal Alpine dependencies
RUN apk add --no-cache libc6-compat

# Ultra-conservative memory settings
ENV NODE_OPTIONS="--max-old-space-size=1024 --gc-interval=100"
ENV NPM_CONFIG_MAXSOCKETS=1
ENV NPM_CONFIG_PREFER_OFFLINE=true

COPY package*.json ./

# CRITICAL TRICK: Install production deps first (avoids sharp compilation)
RUN npm ci --omit=dev \
    --prefer-offline \
    --no-audit \
    --no-fund \
    --progress=false \
    && npm cache clean --force

# ===================================
# Stage 2: Development Dependencies
# ===================================
FROM node:20-alpine AS deps-dev
WORKDIR /app

# Sharp requires additional build tools on Alpine
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++

# Very limited memory for Sharp compilation
ENV NODE_OPTIONS="--max-old-space-size=1200 --max-semi-space-size=64"
ENV NPM_CONFIG_MAXSOCKETS=1

# Copy production deps already installed
COPY --from=deps-prod /app/node_modules ./node_modules
COPY package*.json ./

# Install ONLY devDependencies (now with smaller context)
RUN npm install --omit=optional \
    --prefer-offline \
    --no-audit \
    --no-fund \
    --progress=false \
    && npm cache clean --force

# ===================================
# Stage 3: Build with Extreme Optimizations
# ===================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Memory tuned for Next.js build
ENV NODE_OPTIONS="--max-old-space-size=1280"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy complete node_modules from previous stage
COPY --from=deps-dev /app/node_modules ./node_modules
COPY package*.json ./

# Copy source code
COPY . .

# Build with memory optimization flags
RUN npm run build -- --no-lint \
    && rm -rf .next/cache

# ===================================
# Stage 4: Minimal Runtime
# ===================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apk add --no-cache libc6-compat dumb-init

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy ONLY what's needed for standalone mode
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init for better signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]
