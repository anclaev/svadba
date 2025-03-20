import { Inject } from '@nestjs/common'

import { InjectionTokens } from '#/app/injection-tokens'

/**
 * Декоратор для внедрения экземпляра класса {@link MinioService}
 */
export function InjectMinio(): ParameterDecorator {
  return Inject(InjectionTokens.MINIO_SERVICE)
}

/**
 * Декоратор для внедрения экземпляра класса {@link PrismaService}
 */
export function InjectPrisma(): ParameterDecorator {
  return Inject(InjectionTokens.PRISMA_SERVICE)
}
