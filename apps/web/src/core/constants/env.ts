import { Env } from '../schemes/env-schema'

export const INITIAL_ENV: Env = {
  SENTRY_AUTH_TOKEN: '',
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: '',
  JWT_ACCESS_TIME: 1,
  JWT_REFRESH_TIME: 1,
}

export const ENV_ERRORS = {
  SENTRY_AUTH_TOKEN_REQUIRED: 'Не предоставлен токен Sentry.',
  SENTRY_AUTH_TOKEN_NONEMPTY: 'Токен Sentry не может быть пустым.',
  CLOUDFLARE_TURNSTILE_SITE_KEY_REQUIRED:
    'Не предоставлен site token Cloudflare.',
  CLOUDFLARE_TURNSTILE_SITE_KEY_NONEMPTY:
    'Site token Cloudflare не должен быть пустым.',
} as const
