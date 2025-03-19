'use server'

import { Env } from '@/core/schemes/env-schema'

export const getPublicEnv = async (): Promise<Env> => ({
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!,
})
