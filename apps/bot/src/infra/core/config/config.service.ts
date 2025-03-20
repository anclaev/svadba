import { ConfigService as RootConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

import { Config } from './config.schema'

/**
 * Сервис конфигурации приложения
 */
@Injectable()
export class ConfigService extends RootConfigService<Config, true> {
  constructor() {
    super()
  }

  env<T extends keyof Config>(key: T) {
    return this.get(key, { infer: true })
  }
}
