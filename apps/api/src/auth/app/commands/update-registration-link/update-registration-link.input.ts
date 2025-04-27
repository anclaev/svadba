import { RegistrationLinkMeta } from '../../../domain'

export type UpdateRegistrationLinkInput = {
  isActive?: boolean
  expiresAt?: Date
  meta?: RegistrationLinkMeta
}
