ARG VERSION="latest"
ARG TURBO_VERSION="2.4.4"

# ----------------- Base stage with minimal dependencies -----------------
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache --update libc6-compat && \
    corepack enable

# ----------------- Turbo prune stage (cached separately) -----------------
FROM base AS pruner
ARG TURBO_VERSION
RUN yarn global add turbo@${TURBO_VERSION}

COPY . .
RUN turbo prune web --docker

# ----------------- Dependencies stage (cached separately) -----------------
FROM base AS deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock .
RUN yarn install --frozen-lockfile --network-timeout 1000000

# ----------------- Builder stage with build artifacts -----------------
FROM base AS builder
ARG VERSION
ENV NEXT_PUBLIC_APP_VERSION=$VERSION

COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/yarn.lock .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn turbo run build --filter=web --force && \
    mkdir -p ./apps/web/.next/cache

# ----------------- Final production image -----------------
FROM node:20-alpine AS runner
ARG VERSION

# Install runtime dependencies only
RUN apk add --no-cache --update dumb-init

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_APP_VERSION=$VERSION \
    HOSTNAME="0.0.0.0"

RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nextjs -G nodejs

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/cache ./apps/web/.next/cache

USER nextjs
EXPOSE 3000

# Use dumb-init as entrypoint for better signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]