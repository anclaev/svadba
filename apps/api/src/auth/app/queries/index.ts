import { RegistrationLinkByIdHandler } from './registration-link-by-id'
import { RegistrationLinksHandler } from './registration-links'
import { RegistrationLinksByMetaHandler } from './registration-links-by-meta'

export * from './registration-link-by-id'
export * from './registration-links'
export * from './registration-links-by-meta'

export const registrationLinkQueryHandlers = [
  RegistrationLinksByMetaHandler,
  RegistrationLinksHandler,
  RegistrationLinkByIdHandler,
]
