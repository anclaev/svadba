import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { Logger } from 'winston'
import { ZodObject } from 'zod'

import { ConfigService } from './services/config.service'
import { validate } from './utils'

export type SharedModuleOptions = {
  configSchema: ZodObject<any>
  logger: Logger
}

@Module({})
export class SharedModule {
  static forRoot(options: SharedModuleOptions): DynamicModule {
    return {
      module: SharedModule,
      global: true,
      imports: [
        SentryModule.forRoot(),
        ConfigModule.forRoot({
          validate: (env) =>
            validate(env, options.logger, options.configSchema),
          cache: true,
          isGlobal: true,
        }),
      ],
      providers: [
        ConfigService,
        { provide: APP_INTERCEPTOR, useClass: SentryGlobalFilter },
      ],
      exports: [ConfigService],
    }
  }
}
