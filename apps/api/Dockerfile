ARG VERSION=null

FROM node:20-alpine AS base
WORKDIR /app
RUN apk update \
    apk add --no-cache libc6-compat

# ----------------- Setup a turbo partial monorepo -----------------
FROM base AS builder

RUN yarn global add turbo@2.4.4

COPY . .
 
RUN turbo prune api --docker
 
# ---------------- Install and build the project -----------------
FROM base AS installer
RUN corepack enable 
 
COPY --from=builder /app/out/json/ .
RUN yarn --frozen-lockfile
 
COPY --from=builder /app/out/full/ .


RUN yarn turbo run db:generate
RUN yarn turbo run build
 
# ----------------- Run the production image -----------------
FROM base AS runner
LABEL version=$VERSION
RUN corepack enable

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nestjs /app .
 
EXPOSE 3001

ENTRYPOINT [ "sh", "-c", "yarn turbo db:deploy && node apps/api/dist/main" ]
