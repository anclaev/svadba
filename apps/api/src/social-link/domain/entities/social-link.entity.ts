import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { User } from '#/user/domain'

import { ISocialLinkModel, ISocialLinkProps } from '../interfaces'

@ApiSchema({
  name: 'Социальная ссылка',
  description: 'Схема социальной ссылки',
})
export class SocialLink extends AggregateRoot implements ISocialLinkProps {
  @ApiProperty({
    description: 'Идентификатор ссылки',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: 'Алиас ссылки',
    example: 'telegram',
    type: 'string',
  })
  alias: string

  @ApiProperty({
    description: 'Название ссылки',
    example: 'Telegram',
    type: 'string',
  })
  title: string

  @ApiProperty({
    description: 'Ссылка',
    example: 'https://t.me/anclaev',
    type: 'string',
  })
  href: string

  @ApiProperty({
    description: 'Ссылка на иконку ссылки',
    example: 'https://s3.anclaev.com/svadba/links/472rx4y27f4fy24f8c.png',
    type: 'string',
  })
  icon: string | null

  @ApiProperty({
    description: 'Создатель ссылки',
    type: () => User,
  })
  creator?: User

  @Exclude()
  creatorId: string

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: ISocialLinkProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: ISocialLinkProps): SocialLink {
    return new this(props)
  }

  static fromModel(props: ISocialLinkModel): SocialLink {
    return new this({
      ...props,
      creator: props.creator ? User.fromModel(props.creator) : undefined,
    })
  }
}
