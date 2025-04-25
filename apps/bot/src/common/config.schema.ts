import { zUrlArrayFromString } from '@repo/shared'
import { z } from 'zod'

/**
 * Схема валидации переменных окружения с использованием Zod
 * @constant {z.ZodObject} configSchema
 * @description Определяет структуру и правила валидации для всех переменных окружения приложения.
 * Включает значения по умолчанию, проверки типов и кастомные сообщения об ошибках.
 *
 * @example
 * // Пример использования:
 * import { configSchema } from './config.schema';
 * const env = configSchema.parse(process.env);
 *
 * @see https://zod.dev/ Документация Zod
 */
export const configSchema = z.object({
  /**
   * Окружение приложения (NODE_ENV)
   * @type {z.ZodEnum}
   * @default 'local'
   * @enum ['production', 'development', 'staging', 'local', 'test']
   */
  NODE_ENV: z
    .enum(['production', 'development', 'staging', 'local', 'test'], {
      message: 'Окружение не установлено.',
    })
    .default('local'),

  /**
   * Порт сервиса
   * @type {z.ZodNumber}
   * @default 3002
   * @minimum 1000
   * @maximum 10000
   */
  PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3002),

  /**
   * Порт gRPC-сервиса
   * @type {z.ZodNumber}
   * @default 5002
   * @minimum 1000
   * @maximum 10000
   */
  GRPC_PORT: z.coerce
    .number({ message: 'gRPC-порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(5002),

  /**
   * Версия приложения (обязательная)
   * @type {z.ZodString}
   * @required
   */
  APP_VERSION: z
    .string({ message: 'Версия приложения не предоставлена.' })
    .nonempty({ message: 'Версия приложения не может быть пустой.' }),

  /**
   * Настройки CORS (разрешенные домены)
   * @type {z.ZodArray}
   */
  ALLOWED_ORIGINS: z
    .string({ message: 'Разрешённые домены должны быть строкой.' })
    .nonempty({ message: 'Разрешённые домены не установлены.' })
    .transform(zUrlArrayFromString),

  /**
   * Эндпойнт веб-интерфейса
   * @type {z.ZodString}
   * @format url
   * @required
   */
  WEB_ENDPOINT: z
    .string({ message: 'Ссылка на сайт не предоставлена.' })
    .url({ message: 'Некорректная ссылка на сайт.' }),

  /**
   * Sentry DSN
   * @type {z.ZodString}
   * @format url
   * @required
   */
  SENTRY_DSN: z
    .string({ message: 'Sentry DSN не установлен.' })
    .url({ message: 'Некорректный Sentry DSN.' }),

  /**
   * Токен бота Telegram
   * @type {z.ZodString}
   * @required
   */
  TELEGRAM_BOT_TOKEN: z
    .string({ message: 'Токен бота не установлен.' })
    .nonempty({ message: 'Токен бота не может быть пустым.' }),
})

/**
 * Тип, извлеченный из схемы конфигурации configSchema
 * @typedef {Object} Config
 * @description Представляет типизированную структуру конфигурации приложения,
 * автоматически выведенную из Zod-схемы. Содержит все поля configSchema
 * с соответствующими типами и опциональностью.
 *
 * @property {('production'|'development'|'staging'|'local'|'test')} NODE_ENV - Окружение приложения
 * @property {number} PORT - Порт сервиса (1000-10000)
 * @property {number} GRPC_PORT - gRPC-порт сервиса (1000-10000)
 * @property {string} SENTRY_DSN - Sentry DSN
 * @property {string} APP_VERSION - Версия приложения (обязательная)
 * @property {string[]} ALLOWED_ORIGINS - разрешённые домены для CORS (обязательные)
 * @property {string} WEB_ENDPOINT - URL веб-интерфейса
 * @property {string} TELEGRAM_BOT_TOKEN - Токен бота Telegram
 *
 * @example
 * // Использование типа для аннотации переменных
 * const config: Config = {
 *   NODE_ENV: 'production',
 *   HOST: 'example.com',
 *   // ... остальные обязательные поля
 * };
 *
 * @see configSchema Исходная Zod-схема конфигурации
 */
export type Config = z.infer<typeof configSchema>
