import { GuestRole, Side } from '#prisma'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

import type { GuestAnswers } from '#/users/infra/types'

@ApiSchema({
  name: 'Гость',
  description: 'Информация о госте',
})
export class Guest {
  @ApiProperty({
    description: 'Идентификатор гостя',
    type: 'number',
    example: 1,
  })
  private id: number | null

  @ApiProperty({
    description: 'Сторона, которой принадлежит гость',
    type: 'string',
    example: 'GROOM',
  })
  public side: Side

  @ApiProperty({
    description: 'Роль гостя',
    type: 'string',
    example: 'PARENT',
  })
  public role: GuestRole

  @ApiProperty({
    description: 'Анкета гостя',
    type: 'object',
    example: {},
    additionalProperties: true,
  })
  public answers: GuestAnswers

  @ApiProperty({
    description: 'Дата создания гостя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  public createdAt: Date | null

  constructor(
    side: Side,
    role?: GuestRole,
    answers?: GuestAnswers,
    createdAt?: Date,
    id?: number
  ) {
    this.side = side
    this.role = role ?? GuestRole.GUEST
    this.answers = answers ?? {}
    this.createdAt = createdAt ?? null
    this.id = id ?? null
  }

  public getId(): number | null {
    return this.id
  }

  private setId(id: number) {
    this.id = id
  }
}
