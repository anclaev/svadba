import { Module, Provider } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { InjectionToken } from '#app/injection-token'

import { ConfigModule } from '#infra/core/config/config.module'
import { PrismaService } from '#infra/core/prisma'
import { TelegramModule } from '#infra/core/telegram/telegram.module'

import { AppController } from '#api/app.controller'

/**
 * Слой инфраструктуры приложения
 */
const infra: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
  { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  { provide: InjectionToken.PRISMA_SERVICE, useClass: PrismaService },
]

/**
 * Слой API приложения
 */
const api = [AppController]

@Module({
  imports: [ConfigModule, CqrsModule, TelegramModule],
  controllers: [...api],
  providers: [...infra],
})
export class AppModule {}
