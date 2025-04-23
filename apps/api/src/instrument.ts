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
  dsn: 'https://987faca66c46ba0804d02d932d6cbe19@o4508852529397760.ingest.us.sentry.io/4509131449958400',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
})
