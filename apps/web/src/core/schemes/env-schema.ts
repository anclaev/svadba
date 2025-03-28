import { z } from 'zod'

import { ENV_ERRORS } from '../enums/env-errors'

export const EnvSchema = z.object({
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
