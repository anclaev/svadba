import { JsonObject } from '@prisma/client/runtime/library'

import { user } from '@repo/shared'

import { IUserPrismaModel } from '#/common/models'

import { IGuestModel } from '#/svadba/domain'
import { GuestPrismaMapper } from '#/svadba/infra'

import {
  Credentials,
  ICredentialsProps,
  User as UserEntity,
} from '#/user/domain'

export class UserPrismaMapper {
  static toModel(entity: UserEntity): IUserPrismaModel {
    const guest = entity.guest

    return {
      ...entity,
      guest: guest ? GuestPrismaMapper.toModel(guest) : undefined,
      credentials: entity.credentials.map(
        (item: Credentials) => item.props as unknown as JsonObject
      ),
    } as IUserPrismaModel
  }
  static toEntity(model: IUserPrismaModel): UserEntity {
    return UserEntity.fromModel({
      ...model,
      credentials: model.credentials as unknown as ICredentialsProps[],
      guest: model.guest ? (model.guest as unknown as IGuestModel) : undefined,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.createdAt),
    })
  }
  static toProto(entity: UserEntity): user.User {
    return {
      id: entity.id,
      role: entity.role as string,
      login: entity.login,
      name: String(entity.name),
      is_telegram_verified: entity.isTelegramVerified,
      telegram_id: String(entity.telegramId),
      created_at: entity.createdAt!.toString(),
    }
  }
}
