import { UserRole, UserStatus } from '#prisma'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import * as argon2 from 'argon2'
import { Exclude } from 'class-transformer'

import { RootAggregate } from '#/common/root-aggregate'

import { Credentials } from './value-objects/credentials'
import { Guest } from './value-objects/guest'

import type { CreateUserProps, SavedUserModel, UserModel } from '../infra/types'

@ApiSchema({ name: 'Пользователь', description: 'Схема пользователя' })
export class User extends RootAggregate {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: 1,
    type: 'number',
  })
  private id: number | null = null

  @ApiProperty({
    description: 'ID аккаунта Telegram',
    example: 56938452783,
    type: 'number',
  })
  private telegramId: number | null

  @ApiProperty({
    description: 'Статус аккаунта',
    type: 'string',
    example: 'CREATED',
  })
  public status: UserStatus

  @ApiProperty({
    description: 'Системная роль пользователя',
    type: 'string',
    example: 'PUBLIC',
  })
  public role: UserRole

  @ApiProperty({
    description: 'Логин пользователя',
    type: 'string',
    example: 'JohnDoe',
  })
  public login: string

  @ApiProperty({
    description: 'Имя пользователя',
    type: 'string',
    example: 'John Doe',
  })
  public name: string

  @ApiProperty({
    description: 'Подтверждён ли Telegram',
    type: 'boolean',
    example: false,
  })
  public isTelegramVerified: boolean

  @ApiProperty({
    description: 'Информация о госте',
    type: () => Guest,
  })
  public guest?: Guest | null

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: 'string',
    example: '2025-03-27T10:53:02.377Z',
  })
  public createdAt: Date | null = null

  @Exclude()
  private credentials: Credentials[]

  @Exclude()
  private password: string

  constructor(dto: CreateUserProps) {
    super()

    this.id = dto.id ?? null
    this.login = dto.login
    this.password = dto.password
    this.name = dto.name
    this.telegramId = dto.telegramId ?? null
    this.status = dto.status ?? UserStatus.CREATED
    this.role = dto.role ?? UserRole.PUBLIC
    this.isTelegramVerified = dto.isTelegramVerified ?? false
    this.createdAt = dto.createdAt ?? null

    this.guest = new Guest(
      dto.side,
      dto.guestRole,
      dto.answers,
      dto.guestCreatedAt,
      dto.guestId
    )

    this.credentials = dto.credentials
      ? dto.credentials.map((credentials) => Credentials.fromModel(credentials))
      : []
  }

  public static fromModel(data: SavedUserModel) {
    return new User({
      id: data.id,
      telegramId: data.telegramId ? data.telegramId : undefined,
      status: data.status,
      role: data.role,
      login: data.login,
      isTelegramVerified: data.isTelegramVerified,
      createdAt: data.createdAt ? data.createdAt : undefined,
      password: data.password,
      name: data.name,
      side: data.guest ? data.guest.side : 'BRIDE',
      guestRole: data.guest && data.guest.role ? data.guest.role : 'GUEST',
      answers: data.guest ? data.guest.answers : {},
      guestId: data.guest ? data.guest.id : undefined,
      guestCreatedAt:
        data.guest && data.guest.createdAt ? data.guest.createdAt : undefined,
    })
  }

  public toModel(): Partial<UserModel> {
    return {
      id: this.id ? this.id : undefined,
      telegramId: this.telegramId ? this.telegramId : undefined,
      status: this.status,
      role: this.role,
      password: this.password,
      login: this.login,
      name: this.name,
      isTelegramVerified: this.isTelegramVerified,
      createdAt: this.createdAt ? this.createdAt : undefined,
      credentials: this.credentials.map((credentials) => credentials.toModel()),
      guest: this.guest
        ? {
            id: this.guest.getId() ? this.guest.getId()! : undefined,
            userId: this.id ? this.id : undefined,
            answers: this.guest.answers,
            role: this.guest.role,
            side: this.guest.side,
            createdAt: this.guest.createdAt,
          }
        : undefined,
    }
  }

  public getId(): number | null {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }

  public get credentialsVersion(): number {
    if (this.credentials.length > 0) {
      return this.credentials.sort((a, b) => {
        if (a.version > b.version) return 1
        if (a.version < b.version) return -1
        return 0
      })[this.credentials.length - 1].version
    }
    return 0
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password)
  }

  public async updatePassword(password: string) {
    const newPassword = await argon2.hash(password)

    let lastCredentialsVersion = this.credentialsVersion
    const credentials = new Credentials(lastCredentialsVersion++)

    credentials.set(this.password, new Date())

    this.setPassword(newPassword)
    this.credentials.push(credentials)
  }

  public setPassword(password: string): void {
    this.password = password
  }
}
