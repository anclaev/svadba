import { RegistrationLinkMeta } from '../../../domain'

export type CreateRegistrationLinkInput = {
  ownerId: string
  isActive: boolean
  meta: RegistrationLinkMeta
  expiration?: number
}
