import { RegistrationLink, User } from '#prisma'

export interface IRegistrationLinkPrismaModel extends RegistrationLink {
  owner: User
  ownerId: string
}
