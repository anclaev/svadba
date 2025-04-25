import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import { User } from '#/user/domain'

import { IDresscodeColorModel, IDresscodeColorProps } from '../interfaces'

@ApiSchema({
  name: 'Цвет дресс-кода',
  description: 'Схема цвета дресс-кода',
})
export class DresscodeColor
  extends AggregateRoot
  implements IDresscodeColorProps
{
  @ApiProperty({
    description: 'Идентификатор цвета дресс-кода',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: 'Код цвета',
    uniqueItems: true,
    example: '#ff00ee',
    type: 'string',
  })
  hex: string

  @ApiProperty({
    description: 'Описание цвета',
    uniqueItems: true,
    example: 'Розовый цвет.',
    type: 'string',
  })
  description: string | null

  @ApiProperty({
    description: 'Публичность цвета',
    example: true,
    type: 'boolean',
  })
  isHidden: boolean

  @ApiProperty({
    description: 'Автор цвета',
    type: () => User,
  })
  owner: User

  @ApiProperty({
    description: 'Идентификатор создателя цвета',
    type: 'string',
  })
  ownerId: string

  @ApiProperty({
    description: 'Дата изменения цвета',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  updatedAt?: Date

  @ApiProperty({
    description: 'Дата создания цвета',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IDresscodeColorProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: IDresscodeColorProps): DresscodeColor {
    return new this(props)
  }

  static fromModel(model: IDresscodeColorModel): DresscodeColor {
    return new this({
      ...model,
      owner: User.fromModel(model.owner),
    })
  }
}
