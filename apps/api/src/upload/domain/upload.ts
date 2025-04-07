import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import { RootAggregate } from '#/common/root-aggregate'
import { extractFileProps } from '#/common/utils'

import { User } from '#/user/domain'

import type { CreateUploadProps } from '../infra/types'

@ApiSchema({ name: 'Загрузка', description: 'Загруженный файл' })
export class Upload extends RootAggregate {
  @ApiProperty({
    description: 'Идентификатор загрузки',
    example: 1,
    type: 'number',
  })
  private id: number | null = null

  @ApiProperty({
    description: 'Ссылка на загрузку',
    example: 'https://s3.anclaev.com/svadba/example.webp',
    type: 'string',
  })
  public url: string

  @ApiProperty({
    description: 'Название загрузки',
    example: 'Примерный файл',
    type: 'string',
  })
  public name: string

  @ApiProperty({
    description: 'Название файла',
    example: 'example',
    type: 'string',
  })
  public filename: string

  @ApiProperty({
    description: 'Расширение файла',
    example: 'example',
    type: 'string',
  })
  public ext: string

  @ApiProperty({
    description: 'Тип файла',
    example: 'image/jpeg',
    type: 'string',
    required: false,
  })
  public mimetype: string | null

  @ApiProperty({
    description: 'Владелец загрузки',
    type: () => User,
  })
  public owner: User

  @ApiProperty({
    description: 'Дата создания загрузки',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  public createdAt: Date | null = null

  constructor(dto: CreateUploadProps) {
    super()

    const fileProps = extractFileProps(dto.filename)

    this.id = dto.id ?? null
    this.url = dto.url
    this.filename = dto.filename
    this.ext = dto.ext ?? fileProps.ext
    this.name = dto.name ?? fileProps.name
    this.mimetype = dto.mimetype ?? null
    this.createdAt = dto.createdAt ?? null
  }
}
