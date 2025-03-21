export const UserError = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
} as const

export type UserError = (typeof UserError)[keyof typeof UserError]
