export const GUEST_ERRORS = {
  GUEST_ALREADY_EXISTS: 'GUEST_ALREADY_EXISTS',
  GUEST_NOT_FOUND: 'GUEST_NOT_FOUND',
  GUEST_BAD_OWNER: 'GUEST_BAD_OWNER',
  GUEST_UNKNOWN_ERROR: 'GUEST_UNKNOWN_ERROR',
} as const

export type GUEST_ERRORS = (typeof GUEST_ERRORS)[keyof typeof GUEST_ERRORS]

export class GuestError extends Error {
  constructor(key: GUEST_ERRORS) {
    super(key)
    this.name = 'GuestException'
  }
}
