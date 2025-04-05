import type { Paginated } from '../models/pagination-meta.model'
import type { GuestRole, UserStatus } from '../models/user.model'

export * from './authorize-user'
export * from './create-social-link'
export * from './delete-social-link'
export * from './get-profile'
export * from './get-social-links'
export * from './refresh-user'
export * from './register-user'

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
