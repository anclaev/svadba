import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import { AuthModule } from '#/auth/auth.module'
import { ConfigModule } from '#/config/config.module'
import { CoreModule } from '#/core/core.module'
import { TelegramModule } from '#/telegram/telegram.module'
import { UploadModule } from '#/upload/upload.module'
import { UsersModule } from '#/users/users.module'

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    TelegramModule,
    UploadModule,
    UsersModule,
    AuthModule,
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
