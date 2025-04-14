import { Logger as WinstonLogger, createLogger } from 'winston'

import { loggerOptionsFactory } from '@repo/shared'

import { APP_NAME } from '#/core/constants'

export class LoggerService {
  private static _instance: LoggerService

  private logger: WinstonLogger

  private constructor() {
    this.logger = createLogger(loggerOptionsFactory({ appName: APP_NAME }))

    this.info('LoggerService успешно инициализирован.')
  }

  public static getInstance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new LoggerService()
    return this._instance
  }

  public info(value: string) {
    this.logger.log({ level: 'info', message: value })
  }

  public error(value: string) {
    this.logger.error(value)
  }

  public warn(value: string) {
    this.logger.warn(value)
  }
}
