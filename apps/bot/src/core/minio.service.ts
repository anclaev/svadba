import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import * as Minio from 'minio'

import { ConfigService } from '../config/config.service'

/**
 * Сервис подключения к Minio
 */
@Injectable()
export class MinioService extends Minio.Client implements OnModuleInit {
  private readonly bucket: string

  constructor(
    private readonly logger: Logger,
    readonly config: ConfigService
  ) {
    super({
      endPoint: config.env('S3_ENDPOINT'),
      port: config.env('S3_PORT'),
      accessKey: config.env('S3_ACCESS_TOKEN'),
      secretKey: config.env('S3_SECRET_TOKEN'),
      useSSL:
        config.env('NODE_ENV') === 'staging' ||
        config.env('NODE_ENV') === 'production',
    })
    this.bucket = config.env('S3_BUCKET')
  }

  async onModuleInit(): Promise<void> {
    try {
      const bucketExists = await this.bucketExists(this.bucket)

      if (!bucketExists) {
        this.logger.error(
          `Бакет '${this.bucket}' не существует!`,
          {},
          MinioService.name
        )
        process.exit(1)
      }

      this.logger.log(
        'Подключение к S3-хранилищу установлено!',
        MinioService.name
      )
    } catch {
      this.logger.error(
        'Ошибка подключения к S3-хранилищу!',
        {},
        MinioService.name
      )
      process.exit(1)
    }
  }
}
