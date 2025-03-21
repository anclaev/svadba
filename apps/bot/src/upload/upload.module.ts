import { Module } from '@nestjs/common'

import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

/**
 * Модуль загрузок
 */
@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
