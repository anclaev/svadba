import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { AppController } from '#/app/app.controller'
import { AppHealthIndicator } from '#/app/app.health'
import { AuthModule } from '#/auth/auth.module'
import { ConfigModule } from '#/config/config.module'
import { CoreModule } from '#/core/core.module'
import { SocialLinkModule } from '#/social-link/social-link.module'
import { SvadbaModule } from '#/svadba/svadba.module'
import { UploadModule } from '#/upload/upload.module'
import { UserModule } from '#/user/user.module'

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
