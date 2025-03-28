import { z } from 'zod'

import { ENV_ERRORS } from '@/core/constants/env'

export const EnvSchema = z.object({
  SENTRY_AUTH_TOKEN: z
    .string({
      message: ENV_ERRORS.SENTRY_AUTH_TOKEN_REQUIRED,
    })
    .nonempty({ message: ENV_ERRORS.SENTRY_AUTH_TOKEN_NONEMPTY }),
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z
    .string({ message: ENV_ERRORS.CLOUDFLARE_TURNSTILE_SITE_KEY_REQUIRED })
    .nonempty({ message: ENV_ERRORS.CLOUDFLARE_TURNSTILE_SITE_KEY_NONEMPTY }),
  JWT_ACCESS_TIME: z.coerce
    .number({ message: 'Некорректное время жизни access_token.' })
    .default(3600),
  JWT_REFRESH_TIME: z.coerce
    .number({ message: 'Некорректное время жизни refresh_token.' })
    .default(604800),
})

export type Env = z.infer<typeof EnvSchema>
