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
   * Хост сервиса
   * @type {z.ZodString}
   * @default 'localhost'
   */
  HOST: z
    .string({ message: 'Хост сервиса не установлен.' })
    .nonempty({ message: 'Хост сервиса не может быть пустым.' })
    .default('localhost'),

  /**
   * Порт сервиса
   * @type {z.ZodNumber}
   * @default 3001
   * @minimum 1000
   * @maximum 10000
   */
  PORT: z.coerce
    .number({ message: 'Порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3001),

  /**
   * gRPC-порт сервиса
   * @type {z.ZodNumber}
   * @default 3002
   * @minimum 1000
   * @maximum 10000
   */
  GRPC_PORT: z.coerce
    .number({ message: 'gRPC-порт сервиса не установлен.' })
    .min(1000)
    .max(10000)
    .default(3002),

  /**
   * Настройки CORS (разрешенные домены)
   * @type {z.ZodArray}
   */
  ALLOWED_ORIGINS: z
    .string({ message: 'Разрешённые домены должны быть строкой.' })
    .nonempty({ message: 'Разрешённые домены не установлены.' })
    .transform(zUrlArrayFromString),

  /**
   * Версия приложения (обязательная)
   * @type {z.ZodString}
   * @required
   */
  APP_VERSION: z
    .string({ message: 'Версия приложения не предоставлена.' })
    .nonempty({ message: 'Версия приложения не может быть пустой.' }),

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
   * URL подключения к базе данных (обязательный)
   * @type {z.ZodString}
   * @format url
   * @required
   */
  DATABASE_URL: z
    .string({ message: 'URL базы данных не установлен.' })
    .url({ message: 'Некорректный URL базы данных.' }),

  /**
   * Флаг разрешения регистрации
   * @type {z.ZodBoolean}
   */
  ALLOWED_SIGN_UP: z
    .string()
    .toLowerCase()
    .transform((x) => x === 'true')
    .pipe(z.boolean())
    .default('true'),

  // S3 Storage Configuration
  /**
   * Конфигурация S3 хранилища
   * @namespace S3
   */
  S3_ENDPOINT: z
    .string({ message: 'Хост S3-хранилища не установлен.' })
    .nonempty({ message: 'Хост S3-хранилища не установлен.' }),

  /**
   * Порт S3 хранилища
   * @type {z.ZodNumber}
   * @minimum 1
   * @maximum 10000
   */
  S3_PORT: z.coerce
    .number({ message: 'Порт S3-хранилища не установлен.' })
    .min(1)
    .max(10000),

  /**
   * Имя бакета S3 (обязательное)
   * @type {z.ZodString}
   * @required
   */
  S3_BUCKET: z
    .string({ message: 'Имя бакета S3-хранилища не установлено.' })
    .nonempty({ message: 'Имя бакета S3-хранилища не установлено.' }),

  /**
   * Ключ доступа S3 (обязательный)
   * @type {z.ZodString}
   * @required
   */
  S3_ACCESS_TOKEN: z
    .string({ message: 'Ключ доступа к S3-хранилищу не установлен.' })
    .nonempty({ message: 'Ключ доступа к S3-хранилищу не установлен.' }),

  /**
   * Секретный ключ S3 (обязательный)
   * @type {z.ZodString}
   * @required
   */
  S3_SECRET_TOKEN: z
    .string({ message: 'Секретный ключ доступа к S3-хранилищу не установлен.' })
    .nonempty({
      message: 'Секретный ключ доступа к S3-хранилищу не установлен.',
    }),

  // JWT Configuration
  /**
   * Конфигурация JWT токенов
   * @namespace JWT
   */
  JWT_ACCESS_SECRET: z
    .string({ message: 'Некорректный секрет access_token.' })
    .nonempty({ message: 'Секрет access_token не может быть пустым.' }),

  /**
   * Время жизни access токена (в секундах)
   * @type {z.ZodNumber}
   * @default 3600 (1 час)
   */
  JWT_ACCESS_TIME: z.coerce
    .number({ message: 'Некорректное время жизни access_token.' })
    .default(3600),

  /**
   * Секрет токена подтверждения
   * type {z.ZodString}
   * @required
   */
  JWT_CONFIRMATION_SECRET: z
    .string({ message: 'Некорректный секрет confirmation_token.' })
    .nonempty({ message: 'Секрет confirmation_token не может быть пустым.' }),

  /**
   * Время жизни токена подтверждения (в секундах)
   * @type {z.ZodNumber}
   * @default 3600 (1 час)
   */
  JWT_CONFIRMATION_TIME: z.coerce
    .number({ message: 'Некорректное время жизни confirmation_token.' })
    .default(3600),

  /**
   * Секрет токена сброса пароля
   * type {z.ZodString}
   * @required
   */
  JWT_RESET_PASSWORD_SECRET: z
    .string({ message: 'Некорректный секрет reset_token.' })
    .nonempty({ message: 'Секрет reset_token не может быть пустым.' }),

  /**
   * Время жизни токена сброса пароля (в секундах)
   * @type {z.ZodNumber}
   * @default 3600 (1 час)
   */
  JWT_RESET_PASSWORD_TIME: z.coerce
    .number({ message: 'Некорректное время жизни reset_token.' })
    .default(3600),

  /**
   * Секрет токена обновления
   * type {z.ZodString}
   * @required
   */
  JWT_REFRESH_SECRET: z
    .string({ message: 'Некорректный секрет refresh_token.' })
    .nonempty({ message: 'Секрет refresh_token не может быть пустым.' }),

  /**
   * Время жизни токена обновления (в секундах)
   * @type {z.ZodNumber}
   * @default 604800 (7 дней)
   */
  JWT_REFRESH_TIME: z.coerce
    .number({ message: 'Некорректное время жизни refresh_token.' })
    .default(604800),

  /**
   * Секрет куки
   * type {z.ZodString}
   * @required
   */
  COOKIE_SECRET: z
    .string({ message: 'Некорректный секрет cookie.' })
    .nonempty({ message: 'Секрет cookie не может быть пустым.' }),

  /**
   * Время действия регистрацонной ссылки (в секундах)
   * @type {z.ZodNumber}
   * @default 604800 (7 дней)
   */
  REGISTRATION_LINK_EXPIRATION: z.coerce
    .number({ message: 'Некорректное время действия регистрационной ссылки.' })
    .default(604800),

  // Redis Configuration
  /**
   * Конфигурация Redis
   * @namespace Redis
   */
  REDIS_HOST: z
    .string({ message: 'Некорректный хост Redis.' })
    .nonempty({ message: 'Хост Redis не может быть пустым.' })
    .default('localhost'),

  /**
   * Порт Redis
   * @type {z.ZodNumber}
   * @default 6379
   * @minimum 1000
   * @maximum 10000
   */
  REDIS_PORT: z.coerce
    .number({ message: 'Порт Redis не установлен.' })
    .min(1000)
    .max(10000)
    .default(6379),

  /**
   * Логин пользователя Redis
   * type {z.ZodString}
   * @required
   */
  REDIS_USERNAME: z
    .string({ message: 'Некорректный пользователь Redis.' })
    .nonempty({ message: 'Пользователь Redis не может быть пустым.' }),

  /**
   * Пароль пользователя Redis
   * type {z.ZodString}
   * @required
   */
  REDIS_PASSWORD: z
    .string({ message: 'Некорректный хост Redis.' })
    .nonempty({ message: 'Хост Redis не может быть пустым.' }),

  // Rate Limiting
  /**
   * Лимит запросов
   * @type {z.ZodNumber}
   * @default 10
   */
  REQ_LIMIT: z.coerce
    .number({ message: 'Некорректный лимит запросов.' })
    .default(10),

  /**
   * Время жизни лимита запросов (в секундах)
   * @type {z.ZodNumber}
   * @default 60
   */
  REQ_TTL: z.coerce
    .number({ message: 'Некорректный TTL запросов.' })
    .default(60),
})

/**
 * Тип, извлеченный из схемы конфигурации configSchema
 * @typedef {Object} Config
 * @description Представляет типизированную структуру конфигурации приложения,
 * автоматически выведенную из Zod-схемы. Содержит все поля configSchema
 * с соответствующими типами и опциональностью.
 *
 * @property {('production'|'development'|'staging'|'local'|'test')} NODE_ENV - Окружение приложения
 * @property {string} HOST - Хост сервиса
 * @property {number} PORT - Порт сервиса (1000-10000)
 * @property {number} GRPC_PORT - gRPC-порт сервиса (1000-10000)
 * @property {string[]} ALLOWED_ORIGINS - разрешённые домены для CORS (обязательные)
 * @property {string} APP_VERSION - Версия приложения (обязательная)
 * @property {string} DATABASE_URL - URL базы данных
 * @property {string} SENTRY_DSN - Sentry DSN
 * @property {boolean} ALLOWED_SIGN_UP - Флаг разрешения регистрации
 * @property {string} S3_ENDPOINT - Хост S3 хранилища
 * @property {number} S3_PORT - Порт S3 хранилища (1-10000)
 * @property {string} S3_BUCKET - Имя бакета S3
 * @property {string} S3_ACCESS_TOKEN - Ключ доступа S3
 * @property {string} S3_SECRET_TOKEN - Секретный ключ S3
 * @property {string} JWT_ACCESS_SECRET - Секрет access токена
 * @property {number} JWT_ACCESS_TIME - Время жизни access токена (сек)
 * @property {string} JWT_CONFIRMATION_SECRET - Секрет confirmation токена
 * @property {number} JWT_CONFIRMATION_TIME - Время жизни confirmation токена (сек)
 * @property {string} JWT_RESET_PASSWORD_SECRET - Секрет reset токена
 * @property {number} JWT_RESET_PASSWORD_TIME - Время жизни reset токена (сек)
 * @property {string} JWT_REFRESH_SECRET - Секрет refresh токена
 * @property {number} JWT_REFRESH_TIME - Время жизни refresh токена (сек)
 * @property {string} COOKIE_SECRET - Секрет для подписи cookie
 * @property {string} REDIS_HOST - Хост Redis сервера
 * @property {number} REDIS_PORT - Порт Redis сервера (1000-10000)
 * @property {string} REDIS_USERNAME - Пользователь Redis
 * @property {string} REDIS_PASSWORD - Пароль Redis
 * @property {number} REQ_LIMIT - Лимит запросов
 * @property {number} REQ_TTL - Время жизни лимита запросов (сек)
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
