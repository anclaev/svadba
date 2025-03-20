import { Global, Module } from '@nestjs/common'
import { ConfigModule as RootConfigModule } from '@nestjs/config'

import { ConfigService } from './config.service'
import { validate } from './config.validator'

/**
 * Модуль конфигурации приложения
 */
@Global()
@Module({
  imports: [
    RootConfigModule.forRoot({
      validate,
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
