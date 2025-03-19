import { z } from 'zod'

export const EnvSchema = z.object({
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z
    .string({ message: 'Не предоставлен site token Cloudflare.' })
    .nonempty({ message: 'Site token Cloudflare не должен быть пустым.' }),
})

export type Env = z.infer<typeof EnvSchema>
