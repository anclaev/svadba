import { RegistrationLinkStatus } from '#prisma'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { IUserModel, User } from '#/user/domain'

export * from './registration-link'
export * from './registration-link-query-params'

export interface IRegistrationLinkModel {
  id: string
  status: RegistrationLinkStatus
  isActive: boolean
  ownerId: string
  owner: IUserModel
  meta: InputJsonValue
  expiresAt: Date
  createdAt?: Date
}

export interface IRegistrationLinkProps {
  id: string
  status: RegistrationLinkStatus
  isActive: boolean
  ownerId: string
  owner?: User
  meta: InputJsonValue
  expiresAt: Date
  createdAt?: Date
}
