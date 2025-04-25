import { RegistrationLinkStatus } from '#prisma'

export interface IRegistrationLinkQueryParams {
  status: RegistrationLinkStatus
  isActive: boolean
  isExpired: boolean
  ownerId: string
}
