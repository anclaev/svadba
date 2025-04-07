import { Global, Module } from '@nestjs/common';
import { ConfigModule as RootConfigModule } from '@nestjs/config';
import { validate } from '@repo/shared';

import { logger } from '#/common/logger';

import { configSchema } from './config.schema';
import { ConfigService } from './config.service';

/**
 * Модуль конфигурации приложения
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
