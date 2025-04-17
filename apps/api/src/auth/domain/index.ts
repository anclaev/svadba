export const AuthError = {
  AUTH_FAILED: 'AUTH_FAILED',
} as const

export type AuthError = (typeof AuthError)[keyof typeof AuthError]
