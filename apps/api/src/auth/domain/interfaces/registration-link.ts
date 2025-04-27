import { GuestRole, GuestSide, UserRole } from '#prisma'

export const REGISTRATION_LINK_ERRORS = {
  REGISTRATION_LINK_NOT_FOUND: 'REGISTRATION_LINK_NOT_FOUND',
  REGISTRATION_LINK_BAD_OWNER: 'REGISTRATION_LINK_BAD_OWNER',
  REGISTRATION_LINK_META_LOGIN_EXISTS: 'REGISTRATION_LINK_META_LOGIN_EXISTS',
  REGISTRATION_LINK_UNKNOWN_ERROR: 'REGISTRATION_LINK_UNKNOWN_ERROR',
} as const

export type REGISTRATION_LINK_ERRORS =
  (typeof REGISTRATION_LINK_ERRORS)[keyof typeof REGISTRATION_LINK_ERRORS]

export class RegistrationLinkError extends Error {
  constructor(key: REGISTRATION_LINK_ERRORS) {
    super(key)
    this.name = 'RegistrationLinkException'
  }
}

export type RegistrationLinkMeta = {
  login?: string
  initialPassword?: string
  name?: string
  role?: UserRole
  guestSide?: GuestSide
  guestRole?: GuestRole
}
