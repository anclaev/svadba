import { LoggerService } from '@nestjs/common'
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston'
import { format, LoggerOptions, transports } from 'winston'

import { APP_NAME } from './constants'

/**
 * Параметры логгера
 */
type LocalLoggerOptions = {
  /**
   * Завершение при ошибке
   */
  exitOnError?: boolean
}

/**
 * Фабрика параметров логгера
 * @param {LocalLoggerOptions} options - входные параметры
 * @returns {LoggerOptions} Параметры логгера Winston
 */
export const loggerOptionsFactory = ({
  exitOnError,
}: LocalLoggerOptions): LoggerOptions => ({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike(APP_NAME, {
          colors: true,
          prettyPrint: true,
          processId: false,
          appName: true,
        })
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
