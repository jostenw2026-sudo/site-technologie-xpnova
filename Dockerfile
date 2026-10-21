# Build déterministe Next.js (standalone) — compatible Coolify (build pack: Dockerfile)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Identifiant GA4 du flux de ce site, inliné par `next build` (src/lib/analytics.ts) :
# à déclarer dans Coolify comme « Build Variable ». Absent ou vide = aucune mesure ;
# une variable vide est retirée de l'environnement pour ne pas figer une chaîne vide.
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
RUN if [ -z "$NEXT_PUBLIC_GA_MEASUREMENT_ID" ]; then unset NEXT_PUBLIC_GA_MEASUREMENT_ID; fi; \
    npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000

# 🔧 CORRECTION : Forcer Next.js à écouter sur toutes les interfaces (0.0.0.0)
ENV HOSTNAME=0.0.0.0

# 🔧 CORRECTION : Installer curl et wget pour le health check Coolify
RUN apk add --no-cache curl wget

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

