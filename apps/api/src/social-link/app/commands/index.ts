import { CreateSocialLinkCommandHandler } from './create-social-link'
import { DeleteSocialLinkCommandHandler } from './delete-social-link'
import { UpdateSocialLinkCommandHandler } from './update-social-link'

export const SocialLinkCommandHandlers = [
  CreateSocialLinkCommandHandler,
  UpdateSocialLinkCommandHandler,
  DeleteSocialLinkCommandHandler,
]
