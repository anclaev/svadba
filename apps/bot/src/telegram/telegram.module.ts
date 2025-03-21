import { Global, Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'

import { BOT_NAME } from '../common/constants'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

import { EchoModule } from './echo.module'

@Global()
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.env('TELEGRAM_BOT_TOKEN'),
        include: [EchoModule],
      }),
    }),
    EchoModule,
  ],
})
export class TelegramModule {}
