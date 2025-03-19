import { z } from 'zod'

import { ENV_ERRORS } from '../enums/env-errors'

export const EnvSchema = z.object({
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z
    .string({ message: ENV_ERRORS.CLOUDFLARE_TURNSTILE_SITE_KEY_REQUIRED })
    .nonempty({ message: ENV_ERRORS.CLOUDFLARE_TURNSTILE_SITE_KEY_NONEMPTY }),
})

export type Env = z.infer<typeof EnvSchema>
