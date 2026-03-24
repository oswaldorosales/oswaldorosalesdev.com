# ---------------------------------------------------------
# STAGE 1 — Install dependencies
# ---------------------------------------------------------
FROM node:20-slim AS deps

# Set working directory
WORKDIR /app

# Install build tools required for native Node modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm via corepack
RUN corepack enable
RUN corepack prepare pnpm@9 --activate

# Copy dependency manifests only
# This allows Docker to cache dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# ---------------------------------------------------------
# STAGE 2 — Build the Next.js application
# ---------------------------------------------------------
FROM node:20-slim AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@9 --activate

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Pass reCAPTCHA site key as build argument and environment variable
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN pnpm build

# ---------------------------------------------------------
# STAGE 3 — Production runtime
# ---------------------------------------------------------
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Limit memory usage for small VPS environments
ENV NODE_OPTIONS="--max-old-space-size=384"

# Install minimal runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs

# Copy only required runtime files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Health check for Coolify / Docker
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Start Next.js standalone server
CMD ["dumb-init", "node", "server.js"]