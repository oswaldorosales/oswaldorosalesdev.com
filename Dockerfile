# ===================================
# Stage 1: Dependencies (Fast install on GitHub)
# ===================================
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package*.json ./
# Aprovechamos toda la concurrencia y velocidad del runner de GitHub
RUN npm ci

# ===================================
# Stage 2: Builder (Maximum speed)
# ===================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Next.js will use all available resources in GitHub Actions
RUN npm run build

# ===================================
# Stage 3: Minimal Runtime (Optimized for 2GB VPS via Coolify)
# ===================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Límite de memoria exclusivo para el contenedor en ejecución en el VPS
ENV NODE_OPTIONS="--max-old-space-size=384"

# dumb-init asegura que los procesos de Node se cierren limpiamente
RUN apk add --no-cache libc6-compat dumb-init

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

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
