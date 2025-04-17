import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { User } from '#/user/domain'

import { IUploadModel, IUploadProps } from '../interfaces'

@ApiSchema({
  name: 'Загрузка',
  description: 'Схема загрузки',
})
export class Upload extends AggregateRoot implements IUploadProps {
  @ApiProperty({
    description: 'Идентификатор загрузки',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id?: string

  @ApiProperty({
    description: 'Ссылка на загрузку',
    example: 'https://s3.anclaev.com/svadba/logo.png',
    type: 'string',
  })
  url: string

  @ApiProperty({
    description: 'Название загрузки',
    example: 'Логотип сайта',
    type: 'string',
  })
  name: string

  @ApiProperty({
    description: 'Название загруженного файла',
    example: 'logo.png',
    type: 'string',
  })
  filename: string

  @ApiProperty({
    description: 'Расширение загрузки',
    example: 'png',
    type: 'string',
  })
  ext: string

  @ApiProperty({
    description: 'Тип загрузки',
    example: 'image/png',
    type: 'string',
  })
  mimetype: string | null

  @ApiProperty({
    description: 'Создатель загрузки',
    type: () => User,
  })
  owner: User

  @Exclude()
  ownerId: string

  @ApiProperty({
    description: 'Дата создания загрузки',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IUploadProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: IUploadProps): Upload {
    return new this(props)
  }

  static fromModel(model: IUploadModel): Upload {
    return new this({
      ...model,
      owner: User.fromModel(model.owner),
    })
  }
}
