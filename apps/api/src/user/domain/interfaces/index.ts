import { UserRole, UserStatus } from '#prisma'

import { Guest, IGuestModel } from '#/svadba/domain'
import { Credentials } from '#/user/domain'

export * from './user-query-params.interface'

export interface ICredentialsProps {
  version: number
  lastPassword?: string
  passwordUpdatedAt?: Date
}

export interface IUserModel {
  id: string
  telegramId: number | null
  status: UserStatus
  role: UserRole
  login: string
  password: string
  name: string
  guest?: IGuestModel
  guestId: string | null
  credentials: ICredentialsProps[]
  isTelegramVerified: boolean
  updatedAt?: Date
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
  guest?: Guest
  guestId?: string | null
  credentials: Credentials[]
  isTelegramVerified: boolean
  updatedAt?: Date
  createdAt?: Date
}
