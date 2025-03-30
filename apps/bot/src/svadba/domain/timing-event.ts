import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import { RootAggregate } from '#/common/root-aggregate'

@ApiSchema({
  name: 'Мероприятие свадьбы',
  description: 'Схема мероприятия свадьбы',
})
export class TimingEvent extends RootAggregate {
  @ApiProperty({
    description: 'Идентификатор мероприятия',
    example: 1,
    type: 'number',
  })
  private id: number | null = null

  @ApiProperty({
    description: 'Порядковый номер мероприятия',
    example: 1,
    type: 'number',
  })
  public order: number

  @ApiProperty({
    description: 'Название мероприятия',
    example: 'Банкет',
    type: 'string',
  })
  public title: string

  @ApiProperty({
    description: 'Время мероприятия',
    example: '12:00',
    type: 'string',
  })
  public time: string

  @ApiProperty({
    description: 'Публичность мероприятия',
    example: true,
    type: 'boolean',
  })
  public isPublic: boolean | null

  //   @ApiProperty({
  //     description: 'Иконка мероприятия',
  //   })
  @ApiProperty({
    description: 'Дата создания мероприятия',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  public createdAt: Date | null = null
}
