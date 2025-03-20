import { Global, Module, OnModuleInit } from '@nestjs/common'
import * as Minio from 'minio'

import { InjectionTokens } from '#/app/injection-tokens'

import { ConfigService } from '#/core/config/config.service'
import { InjectMinio } from '#/core/decorators'
import { loggerFactory } from '#/core/logger'

/**
 * Модуль подключения к S3-хранилищу (Minio)
 */
@Global()
@Module({
  exports: [InjectionTokens.MINIO_CLIENT],
  providers: [
    {
      inject: [ConfigService],
      provide: InjectionTokens.MINIO_CLIENT,
      useFactory: (config: ConfigService): Minio.Client => {
        return new Minio.Client({
          endPoint: config.env('S3_ENDPOINT'),
          port: config.env('S3_PORT'),
          accessKey: config.env('S3_ACCESS_TOKEN'),
          secretKey: config.env('S3_SECRET_TOKEN'),
          useSSL:
            config.env('NODE_ENV') === 'staging' ||
            config.env('NODE_ENV') === 'production',
        })
      },
    },
  ],
})
export class MinioModule implements OnModuleInit {
  private logger = loggerFactory({ label: 'Minio' })
  private bucket: string

  constructor(
    @InjectMinio() private minio: Minio.Client,
    private config: ConfigService
  ) {
    this.bucket = this.config.env('S3_BUCKET')
  }

  async onModuleInit() {
    try {
      const bucketExists = await this.minio.bucketExists(this.bucket)

      if (!bucketExists) {
        this.logger.error(`Бакет '${this.bucket}' не существует!`, 'Minio')
        process.exit(0)
      }

      this.logger.log('Подключение к S3-хранилищу установлено!')
    } catch {
      this.logger.error('Ошибка подключения к S3-хранилищу!', 'Minio')
      process.exit(0)
    }
  }
}
