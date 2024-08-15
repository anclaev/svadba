FROM node:18-alpine AS base


# 1. Install dependencies only when needed
FROM base AS deps

ENV YARN_CACHE="/usr/local/.yarn/cache"

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Log for troubleshooting. There should be files in the directory when there's a cache hit
RUN --mount=type=cache,target=${YARN_CACHE} echo "Yarn cache before install: $(ls -la ${YARN_CACHE})"


RUN --mount=type=cache,target=${YARN_CACHE} \
    yarn config set cache-folder ${YARN_CACHE} && \
    yarn install --ignore-engines --ignore-platform --frozen-lockfile && \
    yarn add -D prisma --ignore-engines --ignore-platform --frozen-lockfile

# Another log for troubleshooting. This should never be empty since the NPM modules were installed before running this line
RUN --mount=type=cache,target=${YARN_CACHE} echo "Yarn cache after install: $(ls -la ${YARN_CACHE})"

# 2. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env .env.production

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn prisma generate
RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_NO_WARNINGS=1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs ./

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

RUN npm config set -g update-notifier false

USER nextjs

EXPOSE 3000

ENV PORT=3000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["sh", "./entrypoint.sh"]
