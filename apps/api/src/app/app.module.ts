import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { AuthModule } from '#/auth/auth.module'
import { ConfigModule } from '#/config/config.module'
import { CoreModule } from '#/core/core.module'
import { SocialLinkModule } from '#/social-link/social-link.module'
import { SvadbaModule } from '#/svadba/svadba.module'
import { UploadModule } from '#/upload/upload.module'
import { UserModule } from '#/user/user.module'

import { AppController } from './app.controller'
import { AppHealthIndicator } from './app.health'

/**
 * Корневой модуль приложения
 * @class AppModule
 * @Module
 * @description Главный модуль приложения, который:
 * - Импортирует все функциональные модули
 * - Настраивает глобальные интерцепторы и пайпы
 * - Подключает системы мониторинга и логирования
 *
 * @example
 * // Пример использования в main.ts
 * async function bootstrap() {
 *   const app = await NestFactory.create(AppModule);
 *   await app.listen(3000);
 * }
 */
@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule,
    CoreModule,
    TerminusModule,
    UploadModule,
    UserModule,
    AuthModule,
    SocialLinkModule,
    SvadbaModule,
  ],
  controllers: [AppController],
  providers: [
    AppHealthIndicator,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: SentryGlobalFilter },
  ],
})
export class AppModule {}
