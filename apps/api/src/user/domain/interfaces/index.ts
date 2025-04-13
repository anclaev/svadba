import { GuestRole, Side, UserRole, UserStatus } from '#prisma'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { Credentials, Guest } from '#/user/domain'

export * from './user-query-params.interface'

export interface ICredentialsProps {
  version: number
  lastPassword?: string
  passwordUpdatedAt?: Date
}

export interface IGuestModel {
  id: string
  userId?: string
  side: Side
  role: GuestRole
  answers: InputJsonValue
  createdAt?: Date
}

export interface IGuestProps {
  id: string
  userId?: string
  side: Side
  role: GuestRole
  answers: InputJsonValue
  createdAt?: Date
}

export interface IUserModel {
  id: string
  telegramId: number | null
  status: UserStatus
  role: UserRole
  login: string
  password: string
  name: string | null
  guest: IGuestModel
  guestId: string
  credentials: ICredentialsProps[]
  isTelegramVerified: boolean
  createdAt?: Date
}

export interface IUserProps {
  id: string
  telegramId: number | null
  status: UserStatus
  role: UserRole
  login: string
  password: string
  name: string | null
  guest: Guest
  guestId: string
  credentials: Credentials[]
  isTelegramVerified: boolean
  createdAt?: Date
}
