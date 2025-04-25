import { ISocialLinkPrismaModel } from '#/common/models'

import { UserPrismaMapper } from '#/user/infra'

import { SocialLink as SocialLinkEntity } from '#/social-link/domain'
import { IUserModel } from '#/user/domain'
import { social_link } from '@repo/shared'

export class SocialLinkPrismaMapper {
  static toModel(entity: SocialLinkEntity): ISocialLinkPrismaModel {
    const creator = entity.creator!
    return {
      ...entity,
      creator: entity.creator ? UserPrismaMapper.toModel(creator) : undefined,
    } as ISocialLinkPrismaModel
  }

  static toEntity(model: ISocialLinkPrismaModel): SocialLinkEntity {
    return SocialLinkEntity.fromModel({
      ...model,
      creator: model.creator as unknown as IUserModel,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })
  }

  static toProto(entity: SocialLinkEntity): social_link.SocialLink {
    return {
      id: entity.id,
      alias: entity.alias,
      href: entity.href,
      title: entity.title,
      icon: entity.icon || undefined,
      creator: entity.creator
        ? UserPrismaMapper.toProto(entity.creator)
        : undefined,
      creator_id: entity.creatorId,
      created_at: String(entity.createdAt),
    }
  }
}
