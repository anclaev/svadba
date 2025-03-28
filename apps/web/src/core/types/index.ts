import { GuestRole } from '../models/user.model'

export type AppError = {
  message: string
}

export type ApiError = {
  statusCode: number
  message: string
  errors: { message: string }[]
}

export interface TokenPayload {
  id: number
  tokenId: string
  version: number
  role: GuestRole
  iat: number
  exp: number
  iss: string
  sub: string
}
