import { SocialLinkByIdQueryHandler } from './social-link-by-id'
import { SocialLinksHandler } from './social-links'

export * from './social-link-by-id'
export * from './social-links'

export const socialLinkQueryHandlers = [
  SocialLinksHandler,
  SocialLinkByIdQueryHandler,
]
