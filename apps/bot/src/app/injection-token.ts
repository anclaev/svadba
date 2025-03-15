/**
 * Injection-токены для инфраструктуры приложения
 */
export const InjectionToken = {
  APP_SERVICE: 'APP_SERVICE',
  PRISMA_SERVICE: 'PRISMA_SERVICE',
  TOKEN_SERVICE: 'TOKEN_SERVICE',
  USER_REPOSITORY: 'USER_REPOSITORY',
  ACCOUNT_REPOSITORY: 'ACCOUNT_REPOSITORY',
  TOKEN_REPOSITORY: 'TOKEN_REPOSITORY',
} as const

/**
 * Типы injection-токенов для инфраструктуры приложения
 */
export type InjectionToken =
  (typeof InjectionToken)[keyof typeof InjectionToken]
