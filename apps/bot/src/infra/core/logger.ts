import { format, LoggerOptions, transports } from 'winston'
import { LoggerService } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'

import { APP_NAME } from '#infra/core'

/**
 * Параметры логгера
 */
type LocalLoggerOptions = {
  /**
   * Завершение при ошибке
   */
  exitOnError?: boolean
  /**
   * Метка логгера
   */
  label?: string
  /**
   * Название сервиса
   */
  service?: string
}

/**
 * Фабрика параметров логгера
 * @param {LocalLoggerOptions} options - входные параметры
 * @returns {LoggerOptions} Параметры логгера Winston
 */
export const loggerOptionsFactory = ({
  service = APP_NAME,
  exitOnError,
  label = 'App',
}: LocalLoggerOptions): LoggerOptions => ({
  defaultMeta: {
    service,
    label,
  },
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.metadata({ key: 'metadata' }),
        format.label({ label }),
        format.colorize({ all: true }),
        format.simple(),
        format.timestamp({ format: 'DD.MM.YYYY, HH:mm:ss' }),
        format.printf(
          /* istanbul ignore next */
          ({ metadata, level, message, label, timestamp }) =>
            `\x1b[32m[${(metadata as Record<string, unknown>)['service']}]\x1b[0m ${timestamp} \x1b[32m${' [' + label + '] '} [${level}\x1b[32m]\x1b[0m: \x1b[37m${message}`
        )
      ),
    }),
  ],
  exitOnError,
})

/**
 * Фабрика логгера
 * @param {LocalLoggerOptions} options - параметры логгера
 * @returns {LoggerService} Инстанс логгера
 */
export const loggerFactory = (options: LocalLoggerOptions): LoggerService =>
  WinstonModule.createLogger(loggerOptionsFactory(options))
