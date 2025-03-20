import { Logger, Module, Provider } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { InjectionTokens } from '#/app/injection-tokens'

import { MinioService } from '#/core/minio.service'
import { PrismaService } from '#/core/prisma.service'

import { ConfigModule } from '#/core/config/config.module'
import { TelegramModule } from '#/telegram/telegram.module'

import { AppController } from '#/app/app.controller'

/**
 * Инфраструктура приложения
 */
const infra: Provider[] = [
  Logger,
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
  { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  { provide: InjectionTokens.PRISMA_SERVICE, useClass: PrismaService },
  { provide: InjectionTokens.MINIO_SERVICE, useClass: MinioService },
]

/**
 * API приложения
 */
const api = [AppController]

@Module({
  imports: [ConfigModule, CqrsModule, TelegramModule],
  controllers: [...api],
  providers: [...infra],
})
export class AppModule {}
