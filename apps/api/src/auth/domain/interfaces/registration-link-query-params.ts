import { RegistrationLinkStatus } from '#prisma'

import { RegistrationLinkMeta } from './registration-link'

export interface IRegistrationLinkQueryParams {
  status: RegistrationLinkStatus
  isActive: boolean
  ownerId: string
  meta: RegistrationLinkMeta
}
