/**
 * Injection-токены для инфраструктуры приложения
 */
export const InjectionTokens = {
  APP_SERVICE: 'APP_SERVICE',
  PRISMA_SERVICE: 'PRISMA_SERVICE',
  MINIO_SERVICE: 'MINIO_SERVICE',
  TOKEN_SERVICE: 'TOKEN_SERVICE',
  USER_REPOSITORY: 'USER_REPOSITORY',
  ACCOUNT_REPOSITORY: 'ACCOUNT_REPOSITORY',
  TOKEN_REPOSITORY: 'TOKEN_REPOSITORY',
} as const

/**
 * Типы injection-токенов для инфраструктуры приложения
 */
export type InjectionTokens =
  (typeof InjectionTokens)[keyof typeof InjectionTokens]
