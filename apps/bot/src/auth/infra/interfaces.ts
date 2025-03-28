import { Request } from 'express'

import { GuestRole } from '#prisma'

import { User } from '#/users/domain/user'

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
  id: number
  role: GuestRole
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

export interface IReqWithUser extends Request {
  user: User
}
