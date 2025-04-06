import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TelegrafModule } from 'nestjs-telegraf'

import { BOT_NAME } from './bot.constants'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

import { SocialLinkModule } from '#/social-link/social-link.module'

import { botMiddleware } from './bot.middleware'
import { BotService } from './bot.service'
import { BotUpdate } from './bot.update'
import { scenes } from './scenes'

@Global()
@Module({
  imports: [
    CqrsModule,
    SocialLinkModule,
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.env('TELEGRAM_BOT_TOKEN'),
        middlewares: [botMiddleware],
        include: [BotModule],
      }),
    }),
  ],
  providers: [BotService, BotUpdate, ...scenes],
  exports: [BotService],
})
export class BotModule {}
