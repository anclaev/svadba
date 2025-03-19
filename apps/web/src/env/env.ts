'use server'
export const getPublicEnv = async () => ({
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!,
})
