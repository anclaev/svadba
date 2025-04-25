import { ITimingEventPrismaModel } from '#/common/models'

import { IUserModel } from '#/user/domain'
import { UserPrismaMapper } from '#/user/infra'

import { IUploadModel } from '#/upload/domain'
import { UploadPrismaMapper } from '#/upload/infra'

import { TimingEvent as TimingEventEntity } from '#/svadba/domain'

export class TimingEventPrismaMapper {
  static toModel(entity: TimingEventEntity): ITimingEventPrismaModel {
    const owner = entity.owner
    const icon = entity.icon

    return {
      ...entity,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
      owner: UserPrismaMapper.toModel(owner),
      icon: icon ? UploadPrismaMapper.toModel(icon) : undefined,
    }
  }

  static toEntity(model: ITimingEventPrismaModel): TimingEventEntity {
    return TimingEventEntity.fromModel({
      ...model,
      owner: model.owner as unknown as IUserModel,
      icon: model.icon
        ? (UploadPrismaMapper.toEntity(model.icon) as unknown as IUploadModel)
        : undefined,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })
  }
}
