import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { SharedModule } from '@repo/shared'

import { configSchema } from '#/common/config.schema'
import { logger } from '#/common/logger'

import { BotModule } from '#/bot/bot.module'

import { AppController } from './app.controller'
import { AppHealthIndicator } from './app.health'

@Module({
  imports: [
    SharedModule.forRoot({
      configSchema,
      logger,
    }),
    TerminusModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppHealthIndicator],
})
export class AppModule {}
