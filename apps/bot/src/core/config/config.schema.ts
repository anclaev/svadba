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
  GRPC_PORT: z.coerce
    .number({ message: 'Порт grpc-сервера не установлен.' })
    .min(1000)
    .max(10000)
    .default(3032),
  API_HOST: z
    .string({ message: 'Хост API не установлен.' })
    .nonempty({ message: 'Хост API не может быть пустым.' })
    .default('localhost'),
  API_GRPC_PORT: z.coerce
    .number({ message: 'Порт grpc-сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3005),
  TELEGRAM_BOT_TOKEN: z.string({
    message: 'Токен телеграм-бота не установлен.',
  }),
})

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>
