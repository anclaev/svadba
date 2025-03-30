import { User } from '#/user/domain/User'

export type Authorized = {
  user: User
  access_token?: string
  refresh_token?: string
  refresh_token_id?: string
}

export type LoginResult = {
  user: User
  access_token: string
  refresh_token: string
  refresh_token_id: string
}

export const Tokens = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  CONFIRMATION: 'CONFIRMATION',
  RESET: 'RESET',
} as const

export const Cookies = {
  AUTH_COOKIE: 'auth-cookie',
  REFRESH_COOKIE: 'refresh-cookie',
} as const

export type Tokens = (typeof Tokens)[keyof typeof Tokens]

export type AuthCookieData = {
  access_token: string
} & RefreshCookieData

export type RefreshCookieData = {
  refresh_token: string
  refresh_token_id: string
}
