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
RUN turbo prune api --docker

# ----------------- Dependencies stage (cached separately) -----------------
FROM base AS deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock .
RUN yarn install --frozen-lockfile --network-timeout 1000000

 
# ----------------- Builder stage with build artifacts -----------------
FROM base AS builder
ARG VERSION
ENV APP_VERSION=${VERSION}

COPY --from=pruner /app/out/full/ .
COPY --from=deps /app .

RUN yarn turbo run build --filter=api --force

# ----------------- Final production image -----------------
FROM base AS runner
ARG VERSION
LABEL version=${VERSION}
RUN corepack enable

ENV APP_VERSION=${VERSION}

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs 

COPY --from=builder --chown=nestjs:nestjs /app .

EXPOSE 3001

ENTRYPOINT [ "sh", "-c", "yarn turbo db:deploy && node apps/api/dist/main" ]