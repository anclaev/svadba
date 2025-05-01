import type { Paginated } from '../models/pagination-meta.model'
import type { GuestRole, UserStatus } from '../models/user.model'

export * from './(auth)'
export * from './(registration-links)'
export * from './(social-links)'

export type AppError = {
  message: string
}

export type ApiError = {
  statusCode: number
  message: string
  errors?: { message: string }[]
  error?: string
}

export interface AccessTokenPayload {
  id: number
  role: GuestRole
  status: UserStatus
  iat: number
  exp: number
  iss: string
  sub: string
}

export interface TokenPayload extends AccessTokenPayload {
  tokenId: string
  version: number
}

export type withPagination<T> =
  | (Partial<Paginated<T>> & {
      error?: AppError
      loading?: boolean
    })
  | null
