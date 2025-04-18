import { z } from 'zod'

/**
 * Схема конфигурации приложения
 */
export const configSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'staging', 'local', 'test'], {
      message: 'Окружение не установлено.',
    })
    .default('local'),
  PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3002),
  GRPC_PORT: z.coerce
    .number({ message: 'gRPC-порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(5002),
  APP_VERSION: z
    .string({ message: 'Версия приложения не предоставлена.' })
    .nonempty({ message: 'Версия приложения не может быть пустой.' }),
  WEB_ENDPOINT: z
    .string({ message: 'Ссылка на сайт не предоставлена.' })
    .url({ message: 'Некорректная ссылка на сайт.' }),
  SENTRY_DSN: z
    .string({ message: 'URL базы данных не установлен.' })
    .url({ message: 'Некорректный URL базы данных.' }),
  TELEGRAM_BOT_TOKEN: z
    .string({ message: 'Токен бота не установлен.' })
    .nonempty({ message: 'Токен бота не может быть пустым.' }),
})

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>
