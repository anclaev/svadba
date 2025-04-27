import { RegistrationLinkStatus } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { User } from '#/user/domain'

import {
  IRegistrationLinkModel,
  IRegistrationLinkProps,
  RegistrationLinkMeta,
} from '../interfaces'

@ApiSchema({
  name: 'Регистрационная ссылка',
  description: 'Ссылка для регистрации пользователя',
})
export class RegistrationLink
  extends AggregateRoot
  implements IRegistrationLinkProps
{
  @ApiProperty({
    description: 'Идентификатор регистрационной ссылки',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: 'Статус регистрационной ссылки',
    type: 'string',
    example: 'PENDIND',
  })
  status: RegistrationLinkStatus

  @ApiProperty({
    description: 'Флаг активности регистрационной ссылки',
    type: 'boolean',
    default: 'true',
  })
  isActive: boolean

  @ApiProperty({
    description: 'Данные для регистрации пользователя',
    type: 'object',
    example: {
      name: 'Иван Иванов',
      login: 'IvanIvanov',
      side: 'GROOM',
      role: 'GUEST',
    },
    additionalProperties: true,
  })
  meta: InputJsonValue = {}

  @ApiProperty({
    description: 'Создатель регистрационной ссылки',
    type: () => User,
  })
  owner: User

  @ApiProperty({
    description: 'Идентификатор создателя регистрационной ссылки',
    type: 'string',
  })
  ownerId: string

  @ApiProperty({
    description: 'Дата истечения срока регистрационной ссылки',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  expiresAt: Date

  @ApiProperty({
    description: 'Дата создания регистрационной ссылки',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IRegistrationLinkProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: IRegistrationLinkProps): RegistrationLink {
    return new this(props)
  }

  static fromModel(props: IRegistrationLinkModel): RegistrationLink {
    return new this({
      ...props,
      owner: props.owner ? User.fromModel(props.owner) : undefined,
    })
  }

  get isExpired(): boolean {
    return this.expiresAt < new Date()
  }

  get isApplied(): boolean {
    return this.status === 'APPLIED'
  }

  setMeta(meta: RegistrationLinkMeta): void {
    this.meta = meta
    this.commit()
  }

  apply() {
    this.status = 'APPLIED'
    this.commit()
  }

  deactivate() {
    this.isActive = false
    this.commit()
  }

  activate() {
    this.isActive = true
    this.commit()
  }
}
