import { GuestRole, GuestSide } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { Exclude } from 'class-transformer'

import { IGuestModel, IGuestProps } from '#/svadba/domain'

@ApiSchema({
  name: 'Гость',
  description: 'Информация о госте',
})
export class Guest extends AggregateRoot implements IGuestProps {
  @ApiProperty({
    description: 'Идентификатор гостя',
    type: 'string',
    example: 'c8453d8f-d641-4139-bef6-5d5a0471a61d',
  })
  id: string

  @Exclude()
  userId: string

  @ApiProperty({
    description: 'Сторона, которой принадлежит гость',
    type: 'string',
    example: 'GROOM',
  })
  side: GuestSide

  @ApiProperty({
    description: 'Роль гостя',
    type: 'string',
    example: 'PARENT',
  })
  role: GuestRole = 'GUEST'

  @ApiProperty({
    description: 'Анкета гостя',
    type: 'object',
    example: {},
    additionalProperties: true,
  })
  answers: InputJsonValue = {}

  @ApiProperty({
    description: 'Дата создания гостя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt: Date

  constructor(props: IGuestProps) {
    super()
    Object.assign(this, props)
  }

  static create(props: IGuestProps): Guest {
    return new this(props)
  }

  static fromModel(model: IGuestModel): Guest {
    return new this(model)
  }
}
