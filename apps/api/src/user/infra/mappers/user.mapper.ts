import { JsonObject } from '@prisma/client/runtime/library'
import { user } from '@repo/shared'

import { GuestMapper } from './guest.mapper'

import { User } from '#/user/domain/User'

import type { ICredentialsProps, IGuestRaw } from '#/user/domain/interfaces'
import type { UserModel } from '../interfaces'

export class UserMapper {
  static toTable(domain: User): UserModel {
    const guest = domain.guest

    return {
      id: domain.id ? domain.id.toString() : undefined,
      telegramId: domain.telegramId ?? null,
      guest: GuestMapper.toTable(guest),
      guestId: guest.id ? guest.id.toString() : undefined,
      login: domain.login,
      password: domain.password,
      name: domain.name,
      role: domain.role,
      status: domain.status,
      isTelegramVerified: domain.isTelegramVerified,
      credentials: domain.credentials.map(
        (item) => item.props as unknown as JsonObject
      ),
      createdAt: domain.createdAt ? domain.createdAt : undefined,
    }
  }

  static toDomain(table: UserModel): User {
    return User.mapFromRaw({
      id: table.id,
      telegramId: table.telegramId,
      login: table.login,
      password: table.password,
      name: table.name,
      role: table.role,
      status: table.status,
      isTelegramVerified: table.isTelegramVerified,
      credentials: table.credentials as unknown as ICredentialsProps[],
      guest: table.guest as unknown as IGuestRaw,
      createdAt: table.createdAt,
    })
  }

  static toProto(domain: User): user.User {
    console.log(domain)
    return {
      id: domain.id as string,
      role: domain.role as string,
      login: domain.login as string,
      name: domain.name as string,
      is_telegram_verified: domain.isTelegramVerified,
      guest_status: domain.status as string,
      guest_side: domain.guest.side as string,
      guest_role: domain.guest.role as string,
      created_at: domain.createdAt!.toString(),
      telegram_id: String(domain.telegramId) || undefined,
    }
  }
}
