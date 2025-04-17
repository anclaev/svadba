export * from './entities'
export * from './interfaces'
export * from './repositories'

export const SOCIAL_LINK_ERRORS = {
  SOCIAL_LINK_ALREADY_EXISTS: 'SOCIAL_LINK_ALREADY_EXISTS',
  SOCIAL_LINK_NOT_FOUND: 'SOCIAL_LINK_NOT_FOUND',
  SOCIAL_LINK_BAD_CREATOR: 'SOCIAL_LINK_BAD_CREATOR',
  SOCIAL_LINK_UNKNOWN_ERROR: 'SOCIAL_LINK_UNKNOWN_ERROR',
} as const

export type SOCIAL_LINK_ERRORS =
  (typeof SOCIAL_LINK_ERRORS)[keyof typeof SOCIAL_LINK_ERRORS]

export class SocialLinkError extends Error {
  constructor(key: SOCIAL_LINK_ERRORS) {
    super(key)
    this.name = 'SocialLinkException'
  }
}
