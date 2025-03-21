import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { FileInterceptor } from '@nestjs/platform-express'

import { UploadService } from './upload.service'

/**
 * Контроллер загрузок
 */
@Controller('upload')
export class UploadController {
  constructor(private readonly upload: UploadService) {}

  @Get()
  getUploads(): string {
    return 'uploads list'
  }

  @Get(':id')
  getUploadById(@Param('id') id: string): string {
    return 'upload with id: ' + id
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    const res = await this.upload.uploadFile(file)

    return res
  }
}
