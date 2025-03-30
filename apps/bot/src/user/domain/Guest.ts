import { GuestRole, Side } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { JsonObject } from '@prisma/client/runtime/library'
import { Exclude } from 'class-transformer'

import type { IGuestProps, IGuestRaw } from './interfaces'

@ApiSchema({
  name: 'Гость',
  description: 'Информация о госте',
})
export class Guest extends AggregateRoot implements IGuestProps {
  @ApiProperty({
    description: 'Идентификатор гостя',
    type: 'number',
    example: 1,
  })
  id?: string

  @Exclude()
  userId?: string

  @ApiProperty({
    description: 'Сторона, которой принадлежит гость',
    type: 'string',
    example: 'GROOM',
  })
  side: Side

  @ApiProperty({
    description: 'Роль гостя',
    type: 'string',
    example: 'PARENT',
  })
  role: GuestRole

  @ApiProperty({
    description: 'Анкета гостя',
    type: 'object',
    example: {},
    additionalProperties: true,
  })
  answers: JsonObject

  @ApiProperty({
    description: 'Дата создания гостя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IGuestProps) {
    super()

    this.id = props.id
    this.userId = props.userId
    this.side = props.side
    this.role = props.role ?? 'GUEST'
    this.answers = props.answers ?? {}
    this.createdAt = props.createdAt
  }

  static create(props: IGuestProps): Guest {
    return new Guest(props)
  }

  static fromRaw(props: IGuestRaw): Guest {
    return new Guest(props)
  }
}
