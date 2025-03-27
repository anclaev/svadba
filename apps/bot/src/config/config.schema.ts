import { z } from "zod"

/**
 * Схема конфигурации приложения
 */
export const configSchema = z.object({
  NODE_ENV: z
    .enum(["production", "development", "staging", "local", "test"], {
      message: "Окружение не установлено.",
    })
    .default("local"),
  HOST: z
    .string({ message: "Хост сервиса не установлен." })
    .nonempty({ message: "Хост сервиса не может быть пустым." })
    .default("localhost"),
  PORT: z.coerce
    .number({ message: "Порт сервиса не установлен." })
    .min(1000)
    .max(10000)
    .default(3001),
  DATABASE_URL: z
    .string({ message: "URL базы данных не установлен." })
    .url({ message: "Некорректный URL базы данных." }),
  TELEGRAM_BOT_TOKEN: z.string({
    message: "Токен телеграм бота не установлен.",
  }),
  S3_ENDPOINT: z
    .string({ message: "Хост S3-хранилища не установлен." })
    .nonempty({ message: "Хост S3-хранилища не установлен." }),
  S3_PORT: z.coerce
    .number({ message: "Порт S3-хранилища не установлен." })
    .min(1)
    .max(10000),
  S3_BUCKET: z
    .string({ message: "Имя бакета S3-хранилища не установлено." })
    .nonempty({ message: "Имя бакета S3-хранилища не установлено." }),
  S3_ACCESS_TOKEN: z
    .string({ message: "Ключ доступа к S3-хранилищу не установлен." })
    .nonempty({ message: "Ключ доступа к S3-хранилищу не установлен." }),
  S3_SECRET_TOKEN: z
    .string({ message: "Секретный ключ доступа к S3-хранилищу не установлен." })
    .nonempty({
      message: "Секретный ключ доступа к S3-хранилищу не установлен.",
    }),
  JWT_ACCESS_SECRET: z
    .string({ message: "Некорректный секрет access_token." })
    .nonempty({ message: "Секрет access_token не может быть пустым." }),
  JWT_ACCESS_TIME: z.coerce
    .number({ message: "Некорректное время жизни access_token." })
    .default(3600),
  JWT_CONFIRMATION_SECRET: z
    .string({ message: "Некорректный секрет confirmation_token." })
    .nonempty({ message: "Секрет confirmation_token не может быть пустым." }),
  JWT_CONFIRMATION_TIME: z.coerce
    .number({ message: "Некорректное время жизни confirmation_token." })
    .default(3600),
  JWT_RESET_PASSWORD_SECRET: z
    .string({ message: "Некорректный секрет reset_token." })
    .nonempty({ message: "Секрет reset_token не может быть пустым." }),
  JWT_RESET_PASSWORD_TIME: z.coerce
    .number({ message: "Некорректное время жизни reset_token." })
    .default(3600),
  JWT_REFRESH_SECRET: z
    .string({ message: "Некорректный секрет refresh_token." })
    .nonempty({ message: "Секрет refresh_token не может быть пустым." }),
  JWT_REFRESH_TIME: z.coerce
    .number({ message: "Некорректное время жизни refresh_token." })
    .default(604800),
  COOKIE_SECRET: z
    .string({ message: "Некорректный секрет cookie." })
    .nonempty({ message: "Секрет cookie не может быть пустым." }),
  REDIS_HOST: z
    .string({ message: "Некорректный хост Redis." })
    .nonempty({ message: "Хост Redis не может быть пустым." })
    .default("localhost"),
  REDIS_PORT: z.coerce
    .number({ message: "Порт Redis не установлен." })
    .min(1000)
    .max(10000)
    .default(6379),
  REDIS_USERNAME: z
    .string({ message: "Некорректный пользователь Redis." })
    .nonempty({ message: "Пользователь Redis не может быть пустым." }),
  REDIS_PASSWORD: z
    .string({ message: "Некорректный хост Redis." })
    .nonempty({ message: "Хост Redis не может быть пустым." }),
  REDIS_PREFIX: z
    .string({ message: "Некорректный префикс Redis." })
    .nonempty({ message: "Префикс Redis не может быть пустым." })
    .default("development:"),
  // REDIS_DB=0
})

/**
 * Конфигурация приложения
 */
export type Config = z.infer<typeof configSchema>
