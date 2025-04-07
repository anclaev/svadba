import { Logger } from 'winston'

import { ZodObject } from 'zod'

/**
 * Валидация конфигурации приложения
 * @param {Record<string, any} env - переменные окружения
 * @param {Logger} logger - экземпляр логгера
 * @param {ZodObject<any>} schema - схема конфигурации приложения
 * @returns {Record<string, any>} Конфигурация приложения
 * */
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
