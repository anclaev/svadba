export const APP_NAME = 'Svadba API'

export const TTL_MS = {
  INFINITE: 0,
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
  WEEK: 604800000,
} as const

export const REDIS_KEY = {
  REFRESH_TOKEN: 'refresh-token',
} as const
