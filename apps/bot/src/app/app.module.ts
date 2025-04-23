import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'

import { BotModule } from '#/bot/bot.module'
import { ConfigModule } from '#/config/config.module'

import { AppController } from './app.controller'
import { AppHealthIndicator } from './app.health'

@Module({
  imports: [SentryModule.forRoot(), ConfigModule, TerminusModule, BotModule],
  controllers: [AppController],
  providers: [
    AppHealthIndicator,
    { provide: APP_INTERCEPTOR, useClass: SentryGlobalFilter },
  ],
})
export class AppModule {}
