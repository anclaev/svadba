import { ClientsModule, Transport } from '@nestjs/microservices';
import { TelegrafModule } from 'nestjs-telegraf';
import { Global, Module } from '@nestjs/common';
import { social_link } from '@repo/shared';
import { join } from 'path';

import { ConfigService } from '#/config/config.service';
import { ConfigModule } from '#/config/config.module';

import { BOT_NAME } from './bot.constants';
import { botMiddleware } from './bot.middleware';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { scenes } from './scenes';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: social_link.PACKAGE_NAME,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              url: `${config.env('API_HOST')}:5000`,
              package: social_link.PACKAGE_NAME,
              protoPath: join(__dirname, '../proto/social-link.proto'),
              loader: {
                includeDirs: [join(__dirname, '../proto')],
              },
            },
          }),
        },
      ],
    }),

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
