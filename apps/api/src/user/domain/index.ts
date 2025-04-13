export * from './interfaces'

export * from './value-objects'

export * from './entities'

export * from './repositories'

export const USER_ERRORS = {
  USER_UNKNOWN_ERROR: 'USER_UNKNOWN_ERROR',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const

export type USER_ERRORS = (typeof USER_ERRORS)[keyof typeof USER_ERRORS]

export class UserError extends Error {
  constructor(key: USER_ERRORS) {
    super(key)
    this.name = 'UserException'
  }
}
