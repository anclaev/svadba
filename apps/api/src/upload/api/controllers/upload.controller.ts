import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { Auth } from '#/auth/api'

import { UploadService } from '#/upload/app'

@ApiTags('Загрузки')
@Controller('upload')
export class UploadController {
  constructor(private readonly upload: UploadService) {}

  @ApiExcludeEndpoint()
  @Get()
  getUploads(): string {
    return 'uploads list'
  }

  @ApiExcludeEndpoint()
  @Get(':id')
  getUploadById(@Param('id') id: string): string {
    return 'upload with id: ' + id
  }

  @ApiOperation({
    summary: 'Загрузка файла',
  })
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    const res = await this.upload.uploadFile(file)

    return res
  }
}
