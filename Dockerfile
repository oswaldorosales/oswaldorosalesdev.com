# Stage 1: Install dependencies
FROM node:25-alpine AS deps
WORKDIR /app

# Required for sharp and other native modules on Alpine
RUN apk add --no-cache libc6-compat

# Copy all possible lockfiles
COPY package.json yarn.lock* pnpm-lock.yaml* package-lock.json* ./

# Smart Detection Logic:
# It will prioritize Yarn or PNPM if their lockfiles exist, 
# otherwise it defaults to npm ci for a clean installation.
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Stage 2: Build the app
FROM node:25-alpine AS builder
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

# Stage 3: Production Runner
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Memory safety for your 2GB VPS
ENV NODE_OPTIONS="--max-old-space-size=384"

# Security: Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone mode artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
