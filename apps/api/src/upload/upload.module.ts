import { Module } from '@nestjs/common'

import { UserModule } from '#/user/user.module'

import { UploadController } from './api'
import { UploadService } from './app'
import { UploadRepository } from './domain'
import { UploadPrismaRepository } from './infra'

export const uploadRepositoryProvider = {
  provide: UploadRepository,
  useClass: UploadPrismaRepository,
}

@Module({
  imports: [UserModule],
  controllers: [UploadController],
  providers: [uploadRepositoryProvider, UploadService],
})
export class UploadModule {}
