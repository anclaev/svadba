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
    .number({ message: 'Порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3032),
  API_GRPC_HOST: z
    .string({ message: 'Хост API не установлен.' })
    .nonempty({ message: 'Хост API не может быть пустым.' })
    .default('localhost'),
  API_GRPC_PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен.' })
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
