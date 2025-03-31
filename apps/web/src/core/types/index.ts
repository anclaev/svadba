import { GuestRole, UserStatus } from '../models/user.model'

export type AppError = {
  message: string
}

export type ApiError = {
  statusCode: number
  message: string
  errors: { message: string }[]
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
