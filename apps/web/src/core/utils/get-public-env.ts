'use server'

import type { PublicEnv } from '@/core/types/public-env'

export const getPublicEnv = async (): Promise<PublicEnv> => ({
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!,
})
