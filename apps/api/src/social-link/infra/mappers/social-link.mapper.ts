import { UserMapper } from '#/user/infra'
import { social_link } from '@repo/shared'

import { SocialLink } from '#/social-link/domain/SocialLink'

import type { IUserRaw } from '#/user/domain/interfaces'
import type { SocialLinkModel } from '../interfaces'

export class SocialLinkMapper {
  static toTable(domain: SocialLink): SocialLinkModel {
    const creator = domain.creator

    return {
      id: domain.id ? domain.id.toString() : undefined,
      alias: domain.alias,
      title: domain.title,
      href: domain.href,
      icon: domain.icon ?? null,
      creator: domain.creator ? UserMapper.toTable(creator!) : undefined,
      creatorId: domain.creatorId ? domain.creatorId.toString() : undefined,
      createdAt: domain.createdAt ? domain.createdAt : undefined,
    }
  }

  static toDomain(table: SocialLinkModel): SocialLink {
    return SocialLink.mapFromRaw({
      id: table.id,
      alias: table.alias,
      title: table.title,
      href: table.href,
      icon: table.icon,
      creator: table.creator as unknown as IUserRaw,
      creatorId: table.creatorId!,
      createdAt: table.createdAt,
    })
  }

  static toProto(domain: SocialLink): social_link.SocialLink {
    return {
      id: domain.id!,
      alias: domain.alias!,
      href: domain.href!,
      title: domain.title!,
      creator: domain.creator ? UserMapper.toProto(domain.creator!) : undefined,
      creator_id: domain.creatorId!,
      created_at: domain.createdAt!.toISOString(),
      icon: domain.icon || undefined,
    }
  }
}
