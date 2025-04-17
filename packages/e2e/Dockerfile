FROM node:20-bookworm
WORKDIR /app
ENV CI=true

RUN yarn create playwright --install-deps --no-examples --quiet 
RUN yarn add dotenv

COPY playwright.config.ts .
COPY tests tests

ENTRYPOINT [ "sh", "-c", "yarn playwright test" ]
# ENTRYPOINT [ "sh", "-c", "ls -la" ]