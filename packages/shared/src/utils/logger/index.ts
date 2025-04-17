import { LoggerService } from '@nestjs/common'
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
  WinstonModuleOptions,
} from 'nest-winston'
import { format, transports } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

import { LocalLoggerOptions } from './types'

/**
 * Фабрика параметров логгера
 * @param {LocalLoggerOptions} options - входные параметры
 */
export const loggerOptionsFactory = ({
  appName,
  exitOnError,
}: LocalLoggerOptions): {
  transports: ConsoleTransportInstance[]
  exitOnError: boolean | undefined
} => ({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike(appName, {
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
  WinstonModule.createLogger(
    loggerOptionsFactory(options) as WinstonModuleOptions
  )
