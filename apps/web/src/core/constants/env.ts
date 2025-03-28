import { Env } from '../schemes/env-schema'

export const INITIAL_ENV: Env = {
  SENTRY_AUTH_TOKEN: '',
  JWT_ACCESS_TIME: 1,
  JWT_REFRESH_TIME: 1,
}

export const ENV_ERRORS = {
  SENTRY_AUTH_TOKEN_REQUIRED: 'Не предоставлен токен Sentry.',
  SENTRY_AUTH_TOKEN_NONEMPTY: 'Токен Sentry не может быть пустым.',
} as const
