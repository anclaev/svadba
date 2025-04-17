export const Tokens = {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  CONFIRMATION: 'CONFIRMATION',
  RESET: 'RESET',
} as const

export type Tokens = (typeof Tokens)[keyof typeof Tokens]
