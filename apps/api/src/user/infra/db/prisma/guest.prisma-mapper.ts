import { Guest as GuestModel } from '#prisma'
import { JsonObject } from '@prisma/client/runtime/library'

import { Guest as GuestEntity } from '#/user/domain'

export class GuestPrismaMapper {
  static toModel(entity: GuestEntity): GuestModel {
    return {
      ...entity,
      createdAt: entity.createdAt ? entity.createdAt : undefined,
    } as GuestModel
  }
  static toEntity(model: GuestModel): GuestEntity {
    return GuestEntity.fromModel({
      id: model.id,
      userId: model.userId,
      side: model.side,
      role: model.role!,
      answers: model.answers as JsonObject,
      createdAt: new Date(model.createdAt!),
    })
  }
}
