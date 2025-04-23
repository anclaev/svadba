import { Global, Module } from '@nestjs/common'
import { ConfigModule as RootConfigModule } from '@nestjs/config'
import { validate } from '@repo/shared'

import { logger } from '#/common/logger'

import { configSchema } from './config.schema'
import { ConfigService } from './config.service'

/**
 * Глобальный модуль конфигурации приложения
 * @module ConfigModule
 * @description
 * Модуль предоставляет сервис конфигурации для всего приложения.
 * Выполняет загрузку и валидацию переменных окружения при старте.
 *
 * @Global
 * @decorator @Global() - делает модуль доступным во всем приложении без явного импорта
 *
 * @example
 * // Использование в других модулях
 * @Module({
 *   imports: [ConfigModule] // Не требуется, так как модуль глобальный
 * })
 * export class FeatureModule {}
 *
 * @example
 * // Использование ConfigService в сервисе
 * @Injectable()
 * export class SomeService {
 *   constructor(private config: ConfigService) {}
 * }
 */
@Global()
@Module({
  imports: [
    RootConfigModule.forRoot({
      validate: (env) => validate(env, logger, configSchema),
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
