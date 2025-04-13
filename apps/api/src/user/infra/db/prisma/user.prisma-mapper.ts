import { JsonObject } from '@prisma/client/runtime/library'

import { user } from '@repo/shared'

import { IUserPrismaModel } from '#/common/models'

import {
  Credentials,
  ICredentialsProps,
  IGuestModel,
  User as UserEntity,
} from '#/user/domain'

import { GuestPrismaMapper } from '#/user/infra'

export class UserPrismaMapper {
  static toModel(entity: UserEntity): IUserPrismaModel {
    const guest = entity.guest

    return {
      ...entity,
      guest: GuestPrismaMapper.toModel(guest),
      credentials: entity.credentials.map(
        (item: Credentials) => item.props as unknown as JsonObject
      ),
    } as IUserPrismaModel
  }
  static toEntity(model: IUserPrismaModel): UserEntity {
    return UserEntity.fromModel({
      ...model,
      credentials: model.credentials as unknown as ICredentialsProps[],
      guest: model.guest as unknown as IGuestModel,
      createdAt: new Date(model.createdAt!),
    })
  }
  static toProto(entity: UserEntity): user.User {
    return {
      id: entity.id,
      role: entity.role as string,
      login: entity.login,
      name: String(entity.name),
      guest_role: entity.guest.role as string,
      guest_side: entity.guest.side as string,
      guest_status: entity.status as string,
      is_telegram_verified: entity.isTelegramVerified,
      telegram_id: String(entity.telegramId),
      created_at: entity.createdAt!.toString(),
    }
  }
}
