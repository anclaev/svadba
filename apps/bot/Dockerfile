ARG VERSION=null

FROM node:18-alpine AS base
WORKDIR /app
RUN apk update \
    apk add --no-cache libc6-compat net-tools

# ----------------- Setup a turbo partial monorepo -----------------
FROM base AS builder

RUN yarn global add turbo@2.4.4

COPY . .

RUN turbo prune bot --docker

# ---------------- Install and build the project -----------------
FROM base AS installer
RUN corepack enable

COPY --from=builder /app/out/json/ .
RUN yarn --frozen-lockfile

COPY --from=builder /app/out/full/ .


RUN yarn turbo run build

# ----------------- Run the production image -----------------
FROM base AS runner
LABEL version=$VERSION
ENV PORT=$PORT

RUN corepack enable

RUN addgroup --system --gid 1001 bot
RUN adduser --system --uid 1001 bot
USER bot

COPY --from=installer --chown=bot:bot /app .
COPY apps/bot/src/proto/*.proto apps/bot/dist/proto

EXPOSE $PORT

# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#   CMD netstat -ltn | grep -c "$PORT" || exit 1

ENTRYPOINT [ "sh", "-c", "node apps/bot/dist/main" ]
