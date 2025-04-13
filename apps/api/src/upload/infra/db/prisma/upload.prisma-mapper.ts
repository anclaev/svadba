import { IUploadPrismaModel } from '#/common/models'

import { IUserModel } from '#/user/domain'
import { UserPrismaMapper } from '#/user/infra'

import { Upload as UploadEntity } from '#/upload/domain'

export class UploadPrismaMapper {
  static toModel(entity: UploadEntity): IUploadPrismaModel {
    const owner = entity.owner

    return {
      ...entity,
      owner: UserPrismaMapper.toModel(owner),
    } as IUploadPrismaModel
  }

  static toEntity(model: IUploadPrismaModel): UploadEntity {
    return UploadEntity.fromModel({
      ...model,
      owner: model.owner as unknown as IUserModel,
      createdAt: new Date(model.createdAt),
    })
  }
}
