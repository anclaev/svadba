export * from './db'
export * from './mappers'

export const USER_ERRORS = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
} as const

export type USER_ERRORS = (typeof USER_ERRORS)[keyof typeof USER_ERRORS]

export class UserError extends Error {
  constructor(key: USER_ERRORS) {
    super(key)
    this.name = 'UserException'
  }
}
