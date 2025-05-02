import { ClearExpiredLinksHandler } from './clear-expired-links'
import { CreateRegistrationLinkHandler } from './create-registration-link'
import { DeleteRegistrationLinkHandler } from './delete-registration-link'
import { UpdateRegistrationLinkHandler } from './update-registration-link'

export * from './clear-expired-links'
export * from './create-registration-link'
export * from './delete-registration-link'
export * from './update-registration-link'

export const registrationLinkCommandHandlers = [
  CreateRegistrationLinkHandler,
  ClearExpiredLinksHandler,
  DeleteRegistrationLinkHandler,
  UpdateRegistrationLinkHandler,
]
