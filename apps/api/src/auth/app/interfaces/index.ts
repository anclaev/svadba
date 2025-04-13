import { GuestRole, UserStatus } from '#prisma'
import { Request } from 'express'

import { User } from '#/user/domain'

export interface ISingleJwt {
  secret: string
  time: number
}

export interface IAccessJwt {
  publicKey: string
  privateKey: string
  time: number
}

export interface IJwt {
  access: IAccessJwt
  confirmation: ISingleJwt
  reset: ISingleJwt
  refresh: ISingleJwt
}

export interface ITokenBase {
  iat: number
  exp: number
  iss: string
  aud: string
  sub: string
}

export interface IAccessPayload {
  id: string
  role: GuestRole
  status: UserStatus
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}

export interface IConfirmationPayload extends IAccessPayload {
  version: number
}

export interface IConfirmationToken extends IConfirmationPayload, ITokenBase {}

export interface IRefreshPayload extends IConfirmationPayload {
  tokenId: string
}

export interface IRefreshToken extends IRefreshPayload, ITokenBase {}

// noinspection JSAnnotator
export interface IReqWithUser extends Request {
  user: User
}

// Types

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

export type AuthCookieData = {
  access_token: string
} & RefreshCookieData

export type RefreshCookieData = {
  refresh_token: string
  refresh_token_id: string
}
