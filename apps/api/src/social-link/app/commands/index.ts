import { CreateSocialLinkHandler } from './create-social-link'
import { DeleteSocialLinkHandler } from './delete-social-link'
import { UpdateSocialLinkHandler } from './update-social-link'

export * from './create-social-link'
export * from './delete-social-link'
export * from './update-social-link'

export const socialLinkCommandHandlers = [
  CreateSocialLinkHandler,
  DeleteSocialLinkHandler,
  UpdateSocialLinkHandler,
]
