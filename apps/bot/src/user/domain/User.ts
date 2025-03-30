import { UserRole, UserStatus } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { Guest } from './Guest'
import { Credentials } from './value-objects/Credentials'

import type { IUserProps, IUserRaw } from './interfaces'

@ApiSchema({ name: 'Пользователь', description: 'Схема пользователя' })
export class User extends AggregateRoot implements IUserProps {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '0ffc0421-d8cc-4f1e-9562-9ad64766ed37',
    type: 'string',
  })
  id?: string

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
  name: string

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

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  createdAt?: Date

  constructor(props: IUserProps) {
    super()

    this.id = props.id
    this.telegramId = props.telegramId
    this.status = props.status
    this.role = props.role
    this.login = props.login
    this.password = props.password
    this.name = props.name
    this.guest = props.guest
    this.credentials = props.credentials
    this.isTelegramVerified = props.isTelegramVerified
    this.createdAt = props.createdAt
  }

  static create(props: IUserProps): User {
    return new User(props)
  }

  static mapFromRaw(props: IUserRaw): User {
    return new User({
      ...props,
      credentials: props.credentials.map((item) => Credentials.fromRaw(item)),
      guest: Guest.fromRaw(props.guest),
    })
  }

  get credentialsVersion(): number {
    if (this.credentials.length > 0) {
      const sortedCredentials = this.credentials.sort((a, b) => {
        if (a.props.version > b.props.version) return 1
        if (a.props.version < b.props.version) return -1
        return 0
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
