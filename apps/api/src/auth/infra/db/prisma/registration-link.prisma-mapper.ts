import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library'

import { IRegistrationLinkPrismaModel } from '#/common/models'

import { IUserModel } from '#/user/domain'
import { UserPrismaMapper } from '#/user/infra'

import { RegistrationLink as RegistrationLinkEntity } from '#/auth/domain'

export class RegistrationLinkPrismaMapper {
  static toModel(entity: RegistrationLinkEntity): IRegistrationLinkPrismaModel {
    const owner = entity.owner

    return {
      ...entity,
      meta: entity.meta as JsonValue,
      owner: owner ? UserPrismaMapper.toModel(owner) : undefined,
      createdAt: entity.createdAt!,
    }
  }

  static toEntity(model: IRegistrationLinkPrismaModel): RegistrationLinkEntity {
    return RegistrationLinkEntity.fromModel({
      ...model,
      meta: model.meta as InputJsonValue,
      owner: model.owner as unknown as IUserModel,
      createdAt: new Date(model.createdAt),
      expiresAt: new Date(model.expiresAt),
    })
  }
}
