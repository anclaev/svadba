import { UserModel } from './user.model'

export interface SocialLinkItemModel {
  id: string
  alias: string
  title: string
  href: string
  icon: string | null
  creatorId: string
  createdAt: Date
}

export interface SocialLinkModel extends SocialLinkItemModel {
  creator: UserModel
}
