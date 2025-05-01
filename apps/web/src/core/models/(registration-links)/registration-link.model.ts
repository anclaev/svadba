import { UserModel } from '../user.model'
import { RegistrationLinkMeta } from './registration-link-meta.model'

export type RegistrationLinkStatus = 'PENDING' | 'APPLIED'

export interface RegistrationLinkItemModel {
  id: string
  status: RegistrationLinkStatus
  isActive: boolean
  expiresAt: Date
  createdAt: Date
  meta: RegistrationLinkMeta
  ownerId: string
}

export interface RegistrationLinkModel extends RegistrationLinkItemModel {
  owner: UserModel
}
