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
  S3_ENDPOINT: z
    .string({ message: 'Хост S3-хранилища не установлен' })
    .nonempty({ message: 'Хост S3-хранилища не установлен' }),
  S3_PORT: z.coerce
    .number({ message: 'Порт S3-хранилища не установлен' })
    .min(1)
    .max(10000),
  S3_BUCKET: z
    .string({ message: 'Имя бакета S3-хранилища не установлено' })
    .nonempty({ message: 'Имя бакета S3-хранилища не установлено' }),
  S3_ACCESS_TOKEN: z
    .string({ message: 'Ключ доступа к S3-хранилищу не установлен' })
    .nonempty({ message: 'Ключ доступа к S3-хранилищу не установлен' }),
  S3_SECRET_TOKEN: z
    .string({ message: 'Секретный ключ доступа к S3-хранилищу не установлен' })
    .nonempty({
      message: 'Секретный ключ доступа к S3-хранилищу не установлен',
    }),
})

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>
