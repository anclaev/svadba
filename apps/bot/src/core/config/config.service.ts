import * as dotenv from 'dotenv'

import { LoggerService } from '#/core/logger'

import { Config, configSchema } from './config.schema'

export class ConfigService {
  private static _instance: ConfigService

  private logger: LoggerService
  private envs: Config

  private constructor() {
    this.logger = LoggerService.getInstance()

    dotenv.config()

    const envs = configSchema.safeParse(process.env)

    if (!envs.success) {
      envs.error.errors.map((error) =>
        this.logger.error(`[${error.path}] ${error.message}`)
      )

      process.exit(1)
    }

    this.envs = envs.data!

    this.logger.info('ConfigService успешно инициализирован.')
  }

  public static getInstance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new ConfigService()
    return this._instance
  }

  public get<T extends keyof Config>(key: T) {
    return this.envs[key]
  }
}
