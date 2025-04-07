import { GuestRole, Side, UserRole, UserStatus } from '#prisma'
import { JsonObject } from '@prisma/client/runtime/library'

import { Guest } from './Guest'
import { Credentials } from './value-objects/Credentials'

export interface ICredentialsProps {
  version: number
  lastPassword?: string
  passwordUpdatedAt?: Date
}

export interface IGuestRaw {
  id?: string
  userId?: string
  side: Side
  role?: GuestRole
  answers?: JsonObject
  createdAt?: Date
}

export interface IGuestProps {
  id?: string
  userId?: string
  side: Side
  role?: GuestRole
  answers?: JsonObject
  createdAt?: Date
}

export interface IUserRaw {
  id?: string
  telegramId: number | null
  status: UserStatus
  role: UserRole
  login: string
  password: string
  name: string
  guest: IGuestRaw
  credentials: ICredentialsProps[]
  isTelegramVerified: boolean
  createdAt?: Date
}

export interface IUserProps {
  id?: string
  telegramId: number | null
  status: UserStatus
  role: UserRole
  login: string
  password: string
  name: string
  guest: Guest
  credentials: Credentials[]
  isTelegramVerified: boolean
  createdAt?: Date
}
