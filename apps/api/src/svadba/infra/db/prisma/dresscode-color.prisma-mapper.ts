import { IDresscodeColorPrismaModel } from '#/common/models'

import { IUserModel } from '#/user/domain'
import { UserPrismaMapper } from '#/user/infra'

import { DresscodeColor as DresscodeColorEntity } from '#/svadba/domain'

export class DresscodeColorPrismaMapper {
  static toModel(entity: DresscodeColorEntity): IDresscodeColorPrismaModel {
    const owner = entity.owner

    return {
      ...entity,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
      owner: UserPrismaMapper.toModel(owner),
    }
  }

  static toEntity(model: IDresscodeColorPrismaModel): DresscodeColorEntity {
    return DresscodeColorEntity.fromModel({
      ...model,
      owner: model.owner as unknown as IUserModel,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })
  }
}
