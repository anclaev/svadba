import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import { User } from '#/user/domain'

import type { ISocialLinkProps, ISocialLinkRaw } from './interfaces'

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
  id?: string

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

  @ApiProperty({
    description: 'Идентификатор создателя ссылки',
    type: 'string',
  })
  creatorId: string

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: ISocialLinkProps) {
    super()
    this.id = props.id
    this.alias = props.alias
    this.title = props.title
    this.href = props.href
    this.icon = props.icon
    this.creator = props.creator
    this.creatorId = props.creatorId
    this.createdAt = props.createdAt
  }

  static create(props: ISocialLinkProps): SocialLink {
    return new SocialLink(props)
  }

  static mapFromRaw(props: ISocialLinkRaw): SocialLink {
    return new SocialLink({
      ...props,
      creator: props.creator ? User.mapFromRaw(props.creator) : undefined,
    })
  }
}
