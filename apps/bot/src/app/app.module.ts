import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { ConfigModule } from '#/config/config.module'
import { CoreModule } from '#/core/core.module'
import { TelegramModule } from '#/telegram/telegram.module'
import { UploadModule } from '#/upload/upload.module'

import { AppController } from './app.controller'

@Module({
  imports: [CqrsModule, ConfigModule, CoreModule, TelegramModule, UploadModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
