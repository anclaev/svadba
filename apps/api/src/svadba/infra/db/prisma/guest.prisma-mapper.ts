import { Guest as GuestModel } from '#prisma'
import { JsonObject } from '@prisma/client/runtime/library'

import { IGuestPrismaModel, IUserPrismaModel } from '#/common/models'

import { UserPrismaMapper } from '#/user/infra'

import { Guest as GuestEntity } from '../../../domain'

export class GuestPrismaMapper {
  static toModel(entity: GuestEntity): IGuestPrismaModel {
    return {
      ...entity,
      createdAt: entity.createdAt ? entity.createdAt : undefined,
      updatedAt: entity.updatedAt ? entity.updatedAt : undefined,
    } as GuestModel
  }
  static toEntity(model: IGuestPrismaModel): GuestEntity {
    return GuestEntity.fromModel({
      id: model.id,
      user: model.user
        ? UserPrismaMapper.toEntity(model.user as unknown as IUserPrismaModel)
        : null,
      userId: model.userId,
      side: model.side,
      role: model.role!,
      answers: model.answers as JsonObject,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })
  }
}
