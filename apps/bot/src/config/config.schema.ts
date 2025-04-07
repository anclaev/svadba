import { z } from 'zod';

/**
 * Схема конфигурации приложения
 */
export const configSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'staging', 'local', 'test'], {
      message: 'Окружение не установлено.',
    })
    .default('local'),
  HOST: z
    .string({ message: 'Хост сервиса не установлен.' })
    .nonempty({ message: 'Хост сервиса не может быть пустым.' })
    .default('localhost'),
  PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3002),
  API_HOST: z
    .string({ message: 'Хост API не установлен.' })
    .nonempty({ message: 'Хост API не может быть пустым.' })
    .default('localhost'),
  APP_VERSION: z
    .string({ message: 'Версия приложения не предоставлена.' })
    .nonempty({ message: 'Версия приложения не может быть пустой.' }),
  TELEGRAM_BOT_TOKEN: z.string({
    message: 'Токен телеграм бота не установлен.',
  }),
});

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>;
