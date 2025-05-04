#!/bin/bash

# Переменные окружения
NODE_ENV="staging"
APP_VERSION="v1.0.0"
API_URL="https://api.example.com"
SENTRY_AUTH_TOKEN="your_sentry_token_here"
ALLOWED_SIGN_UP=true

# Запуск контейнера в фоновом режиме
docker run -d \
  --name svadba-web-container \
  -e API_URL="$API_URL" \
  -e SENTRY_AUTH_TOKEN="$SENTRY_AUTH_TOKEN" \
  -e NODE_ENV="$NODE_ENV" \
  -e NEXT_PUBLIC_APP_VERSION="$APP_VERSION" \
  -e NEXT_PUBLIC_ALLOWED_SIGN_UP="$ALLOWED_SIGN_UP" \
  -p 9000:3000 \
  svadba-web:local

echo "Контейнер svadba-web:local запущен в фоновом режиме с именем svadba-web-container"