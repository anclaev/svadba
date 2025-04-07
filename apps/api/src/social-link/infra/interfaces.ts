import { SocialLink } from '#prisma'

import { UserModel } from '#/user/infra/interfaces'

export type SocialLinkModel = Omit<
  SocialLink,
  'id' | 'creatorId' | 'createdAt'
> & {
  id?: string
  creator?: UserModel
  creatorId?: string
  createdAt?: Date
}
