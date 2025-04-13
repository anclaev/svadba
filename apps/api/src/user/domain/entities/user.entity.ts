import { UserRole, UserStatus } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { Credentials, Guest } from '#/user/domain'

import { IUserModel, IUserProps } from '../interfaces'

@ApiSchema({ name: 'Пользователь', description: 'Схема пользователя' })
export class User extends AggregateRoot implements IUserProps {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: 'ID аккаунта Telegram',
    example: 56938452783,
    type: 'number',
  })
  telegramId: number | null

  @ApiProperty({
    description: 'Статус аккаунта',
    type: 'string',
    example: 'CREATED',
  })
  status: UserStatus

  @ApiProperty({
    description: 'Системная роль пользователя',
    type: 'string',
    example: 'PUBLIC',
  })
  role: UserRole

  @ApiProperty({
    description: 'Логин пользователя',
    type: 'string',
    example: 'JohnDoe',
  })
  login: string

  @Exclude()
  password: string

  @ApiProperty({
    description: 'Имя пользователя',
    type: 'string',
    example: 'John Doe',
  })
  name: string | null

  @ApiProperty({
    description: 'Подтверждён ли Telegram',
    type: 'boolean',
    example: false,
  })
  isTelegramVerified: boolean

  @Exclude()
  credentials: Credentials[]

  @ApiProperty({
    description: 'Информация о госте',
    type: () => Guest,
  })
  guest: Guest

  @Exclude()
  guestId: string

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IUserProps) {
    super()

    Object.assign(this, props)
  }

  static create(props: IUserProps): User {
    return new this(props)
  }

  static fromModel(model: IUserModel): User {
    return new this({
      ...model,
      credentials: model.credentials
        ? model.credentials.map((item) => Credentials.fromRaw(item))
        : [],
      guest: Guest.fromModel(model.guest),
    })
  }

  get credentialsVersion(): number {
    if (this.credentials.length > 0) {
      const sortedCredentials = this.credentials.sort((a, b) => {
        if (a.props.version > b.props.version) return 1
        if (a.props.version < b.props.version) return -1
        return 0
      })

      return sortedCredentials[this.credentials.length - 1].props.version
    }
    return 0
  }

  updatePassword(newPassword: string) {
    let lastCredentialsVersion = this.credentialsVersion

    const credentials = new Credentials({
      version: lastCredentialsVersion++,
      lastPassword: this.password,
      passwordUpdatedAt: new Date(),
    })

    this.credentials.push(credentials)
    this.password = newPassword

    return this
  }
}
