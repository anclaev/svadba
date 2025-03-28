import { Env } from '../schemes/env-schema'

export const INITIAL_ENV: Env = {
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: '',
  JWT_ACCESS_TIME: 1,
  JWT_REFRESH_TIME: 1,
}

export const ENV_ERRORS = {
  CLOUDFLARE_TURNSTILE_SITE_KEY_REQUIRED:
    'Не предоставлен site token Cloudflare.',
  CLOUDFLARE_TURNSTILE_SITE_KEY_NONEMPTY:
    'Site token Cloudflare не должен быть пустым.',
} as const
