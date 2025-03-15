FROM node:18-alpine AS base
WORKDIR /app
RUN apk update
RUN apk add --no-cache libc6-compat

# ----------------- Setup a turbo partial monorepo -----------------
FROM base AS builder

RUN yarn global add turbo@2.4.4

COPY . .
 
RUN turbo prune web --docker
 
# ---------------- Install and build the project -----------------
FROM base AS installer
RUN corepack enable 
 
COPY --from=builder /app/out/json/ .
RUN yarn install --frozen-lockfile
 
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build
 
# ----------------- Run the production image -----------------
FROM base AS runner
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

# ENTRYPOINT [ "sh", "-c", "bun run db:deploy && bun next start" ]
ENTRYPOINT [ "sh", "-c", "node apps/web/server.js" ]
