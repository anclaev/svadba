import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { AuthModule } from '#/auth/auth.module'
import { BotModule } from '#/bot/bot.module'
import { ConfigModule } from '#/config/config.module'
import { CoreModule } from '#/core/core.module'
import { SocialLinkModule } from '#/social-link/social-link.module'
import { SvadbaModule } from '#/svadba/svadba.module'
import { UploadModule } from '#/upload/upload.module'
import { UserModule } from '#/user/user.module'

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    BotModule,
    UploadModule,
    UserModule,
    AuthModule,
    SocialLinkModule,
    SvadbaModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
