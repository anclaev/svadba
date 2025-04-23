import { Logger } from 'winston'

import { ZodObject } from 'zod'

/**
 * Валидирует конфигурацию окружения (env) по заданной Zod-схеме
 *
 * @param {Record<string, any>} env - Объект с переменными окружения для валидации
 * @param {Logger} logger - Логгер для записи ошибок валидации
 * @param {ZodObject<any>} schema - Zod-схема для валидации
 * @returns {Record<string, any>} Валидированный объект окружения
 *
 * @throws {Error} Завершает процесс с кодом 1 при ошибке валидации
 *
 * @example
 * // Пример использования:
 * const envSchema = z.object({
 *   PORT: z.number(),
 *   DATABASE_URL: z.string().url(),
 * });
 *
 * const validatedEnv = validate(process.env, logger, envSchema);
 *
 * @description
 * Функция выполняет безопасный парсинг (safeParse) переданного объекта окружения
 * по указанной Zod-схеме. При обнаружении ошибок валидации:
 * 1. Логирует каждую ошибку через переданный логгер
 * 2. Завершает процесс с кодом ошибки 1
 *
 * При успешной валидации возвращает типизированный объект с переменными окружения.
 */
export const validate = (
  env: Record<string, any>,
  logger: Logger,
  schema: ZodObject<any>
): Record<string, any> => {
  const result = schema.safeParse(env)

  if (!result.success) {
    result.error.errors.forEach((err) => {
      logger.error(err.message, { context: 'Config' })
    })

    process.exit(1)
  }

  return result.data as Record<string, any>
}
