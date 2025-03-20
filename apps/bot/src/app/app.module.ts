import { Module, Provider } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { InjectionTokens } from '#/app/injection-tokens'

import { PrismaService } from '#/core/prisma'

import { ConfigModule } from '#/core/config/config.module'
import { MinioModule } from '#/minio/minio.module'
import { TelegramModule } from '#/telegram/telegram.module'

import { AppController } from '#/api/app.controller'

/**
 * Инфраструктура приложения
 */
const infra: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
  { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  { provide: InjectionTokens.PRISMA_SERVICE, useClass: PrismaService },
]

/**
 * API приложения
 */
const api = [AppController]

@Module({
  imports: [ConfigModule, CqrsModule, MinioModule, TelegramModule],
  controllers: [...api],
  providers: [...infra],
})
export class AppModule {}
