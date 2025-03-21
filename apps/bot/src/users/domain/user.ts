import { UserRole, UserStatus } from '#prisma'

import { RootAggregate } from '#/common/root-aggregate'

import { Guest } from './value-objects/guest'

import type { CreateUserProps, SavedUserModel, UserModel } from '../infra/types'

export class User extends RootAggregate {
  private id: number | null = null
  private telegramId: number | null
  public status: UserStatus
  public role: UserRole
  public login: string
  private password: string
  public name: string
  public isTelegramVerified: boolean
  public guest?: Guest | null

  constructor(dto: CreateUserProps) {
    super()

    this.login = dto.login
    this.password = dto.password
    this.name = dto.name
    this.telegramId = dto.telegramId ?? null
    this.status = dto.status ?? UserStatus.CREATED
    this.role = dto.role ?? UserRole.PUBLIC
    this.isTelegramVerified = dto.isTelegramVerified ?? false

    this.guest = new Guest(dto.side, dto.guestRole, dto.answers)
  }

  public fromModel(user: SavedUserModel) {
    this.id = user.id
    this.telegramId = user.telegramId
    this.status = user.status
    this.role = user.role
    this.login = user.login
    this.isTelegramVerified = user.isTelegramVerified
    this.createdAt = user.createdAt

    if (user.guest) {
      this.guest = new Guest(
        user.guest.side,
        user.guest.role,
        user.guest.answers,
        user.guest.createdAt ? user.guest.createdAt : undefined
      )
    }
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
}
