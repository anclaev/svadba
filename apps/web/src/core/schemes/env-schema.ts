import { z } from 'zod'

export const EnvSchema = z.object({
  SENTRY_AUTH_TOKEN: z
    .string({
      message: 'Не предоставлен токен Sentry.',
    })
    .nonempty({ message: 'Токен Sentry не может быть пустым.' }),
  API_URL: z
    .string({ message: 'Не предоставлен эндпойнт API.' })
    .url({ message: 'Эндпойнт API должен быть url.' })
    .nonempty({ message: 'Эндпойнт API не может быть пустым.' }),
  JWT_ACCESS_TIME: z.coerce
    .number({ message: 'Некорректное время жизни access_token.' })
    .default(3600),
  JWT_REFRESH_TIME: z.coerce
    .number({ message: 'Некорректное время жизни refresh_token.' })
    .default(604800),
  NEXT_PUBLIC_NODE_ENV: z.enum(
    ['local', 'test', 'development', 'staging', 'production'],
    { message: 'Некорректное окружение.' }
  ),
  NEXT_PUBLIC_APP_VERSION: z
    .string({ message: 'Не предоставлена версия приложения.' })
    .nonempty({ message: 'Версия приложения не может быть пустой.' }),
})

export type Env = z.infer<typeof EnvSchema>
