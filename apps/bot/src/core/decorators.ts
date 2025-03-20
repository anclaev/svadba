import { Inject } from '@nestjs/common'

import { InjectionTokens } from '#/app/injection-tokens'

/**
 * Декоратор для внедрения экземпляра класса {@link Minio}
 */
export function InjectMinio(): ParameterDecorator {
  return Inject(InjectionTokens.MINIO_CLIENT)
}
