import { GuestRole, GuestSide } from '#prisma'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { IUploadModel, Upload } from '#/upload/domain'
import { IUserModel, User } from '#/user/domain'

export * from './dresscode-color'
export * from './dresscode-color-query-params.interface'
export * from './guest'
export * from './guest-query-params.interface'
export * from './timing-event'
export * from './timing-event-query-params.interface'

export interface IGuestModel {
  id: string
  userId?: string
  side: GuestSide
  role: GuestRole
  answers: InputJsonValue
  createdAt?: Date
}

export interface IGuestProps {
  id: string
  userId?: string
  user?: IUserModel
  side: GuestSide
  role: GuestRole
  answers: InputJsonValue
  createdAt?: Date
}

export interface IDresscodeColorModel {
  id: string
  hex: string
  description: string | null
  isHidden: boolean
  owner: IUserModel
  ownerId: string
  createdAt?: Date
}

export interface IDresscodeColorProps {
  id: string
  hex: string
  description: string | null
  isHidden: boolean
  owner: User
  ownerId: string
  createdAt?: Date
}

export interface ITimingEventModel {
  id: string
  order: number
  title: string
  time: string
  isPublic: boolean
  icon?: IUploadModel
  iconId: string | null
  owner: IUserModel
  ownerId: string
  createdAt?: Date
}

export interface ITimingEventProps {
  id: string
  order: number
  title: string
  time: string
  isPublic: boolean
  icon?: Upload
  iconId: string | null
  owner: User
  ownerId: string
  createdAt?: Date
}
