import { SocialLink, User } from '#prisma'

export interface ISocialLinkPrismaModel extends SocialLink {
  creator: User
  creatorId: string
}
