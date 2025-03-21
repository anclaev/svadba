import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { ConfigService } from '#/config/config.service'
import { MinioService } from '#/core/minio.service'

import type { UploadedObjectInfo } from 'minio/dist/main/internal/type'

/**
 * Сервис работы с загрузками
 */
@Injectable()
export class UploadService {
  private bucket: string

  constructor(
    private readonly minio: MinioService,
    private readonly config: ConfigService
  ) {
    this.bucket = this.config.env('S3_BUCKET')
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadedObjectInfo> {
    const filename = `${randomUUID().toString()}-${file.originalname}`

    return this.minio.putObject(this.bucket, filename, file.buffer, file.size, {
      mimetype: file.mimetype,
    }) as Promise<UploadedObjectInfo>
  }
}
