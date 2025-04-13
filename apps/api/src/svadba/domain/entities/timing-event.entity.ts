import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import { Upload } from '#/upload/domain'
import { User } from '#/user/domain'

import { ITimingEventModel, ITimingEventProps } from '../interfaces'

@ApiSchema({
  name: 'Мероприятие дня',
  description: 'Схема мероприятия дня',
})
export class TimingEvent extends AggregateRoot implements ITimingEventProps {
  @ApiProperty({
    description: 'Идентификатор мероприятия дня',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: 'Порядковый номер мероприятия',
    example: 1,
    type: 'number',
  })
  order: number

  @ApiProperty({
    description: 'Название мероприятия',
    example: 'Банкет',
    type: 'string',
  })
  title: string

  @ApiProperty({
    description: 'Время мероприятия',
    example: '12:00',
    type: 'string',
  })
  time: string

  @ApiProperty({
    description: 'Публичность мероприятия',
    example: true,
    type: 'boolean',
  })
  isPublic: boolean

  @ApiProperty({
    description: 'Иконка мероприятия',
    type: () => Upload,
  })
  icon?: Upload

  @ApiProperty({
    description: 'Идентификатор иконки',
    type: 'string',
  })
  iconId: string | null

  @ApiProperty({
    description: 'Автор мероприятия',
    type: () => User,
  })
  owner: User

  @ApiProperty({
    description: 'Идентификатор создателя мероприятия',
    type: 'string',
  })
  ownerId: string

  @ApiProperty({
    description: 'Дата создания мероприятия',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: ITimingEventProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: ITimingEventProps): TimingEvent {
    return new this(props)
  }

  static fromModel(model: ITimingEventModel): TimingEvent {
    return new this({
      ...model,
      owner: User.fromModel(model.owner),
      icon: model.icon ? Upload.fromModel(model.icon) : undefined,
    })
  }
}
