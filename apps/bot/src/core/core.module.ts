import { Global, Logger, Module } from '@nestjs/common'

import { MinioService } from './minio.service'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [Logger, PrismaService, MinioService],
  exports: [PrismaService, MinioService],
})
export class CoreModule {}
