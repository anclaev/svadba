import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

/**
 * Инициализация Sentry для мониторинга ошибок и производительности
 * @function
 * @description Настраивает интеграцию Sentry SDK с параметрами:
 * - Отслеживание ошибок и исключений
 * - Профилирование производительности Node.js
 * - Трассировка запросов
 *
 * @see https://docs.sentry.io/platforms/node/ Документация Sentry для Node.js
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
  environment: process.env.NODE_ENV,
})
