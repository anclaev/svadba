import { z } from 'zod'

/**
 * Схема конфигурации приложения
 */
export const configSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'staging', 'local', 'test'], {
      message: 'Окружение не установлено',
    })
    .default('local'),
  HOST: z
    .string({ message: 'Хост сервиса не установлен' })
    .min(1)
    .default('localhost'),
  PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен' })
    .min(1000)
    .max(10000)
    .default(3001),
  DATABASE_URL: z
    .string({ message: 'URL базы данных не установлен' })
    .url({ message: 'Некорректный URL базы данных' }),
  TELEGRAM_BOT_TOKEN: z.string({
    message: 'Токен телеграм бота не установлен',
  }),
})

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>
