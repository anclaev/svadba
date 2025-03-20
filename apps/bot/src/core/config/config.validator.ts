import { createLogger } from 'winston'

import { loggerOptionsFactory } from '../logger'
import { configSchema } from './config.schema'

/**
 * Валидация конфигурации приложения
 * @param {Record<string, any} env - переменные окружения
 * @returns {Record<string, any>} Конфигурация приложения
 * */
export const validate = (env: Record<string, any>): Record<string, any> => {
  const loggerOptions = loggerOptionsFactory({
    label: 'Config',
    exitOnError: false,
  })

  const logger = createLogger(loggerOptions)

  const result = configSchema.safeParse(env)

  if (!result.success) {
    result.error.errors.forEach((err) => {
      logger.error(err.message)
    })

    process.exit(1)
  }

  return result.data as Record<string, any>
}
