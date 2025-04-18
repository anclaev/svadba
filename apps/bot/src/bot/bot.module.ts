import { NestjsGrammyModule } from '@grammyjs/nestjs'
import { Logger, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { bot } from '@repo/shared'
import { join } from 'path'

import { BOT_NAME } from '#/common/constants'

import { ConfigService } from '#/config/config.service'

import { sessionMiddleware } from './lib'

import { BotGRPCController } from './bot.grpc-controller'
import { BotUpdate } from './bot.update'

@Module({
  imports: [
    NestjsGrammyModule.forRootAsync({
      inject: [ConfigService],
      botName: BOT_NAME,
      useFactory: (config: ConfigService) => ({
        token: config.get('TELEGRAM_BOT_TOKEN'),
        middlewares: [sessionMiddleware],
        pollingOptions: {
          allowed_updates: ['chat_member', 'message', 'callback_query'],
        },
      }),
    }),
    ClientsModule.register([
      {
        name: bot.PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: bot.PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/bot.proto'),
          loader: {
            includeDirs: [join(__dirname, '../proto')],
          },
        },
      },
    ]),
  ],
  controllers: [BotGRPCController],
  providers: [Logger, BotUpdate],
})
export class BotModule {}
