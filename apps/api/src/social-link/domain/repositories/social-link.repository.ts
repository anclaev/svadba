import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import {
  ISocialLinkQueryParams,
  SocialLink,
  SocialLinkError,
} from '#/social-link/domain'

export abstract class SocialLinkRepository
  implements IRepository<SocialLink, SocialLinkError>
{
  abstract create(entity: SocialLink): Promise<SocialLink | SocialLinkError>
  abstract update(entity: SocialLink): Promise<SocialLink | SocialLinkError>
  abstract delete(id: string): Promise<boolean | SocialLinkError>

  abstract exists(alias: string): Promise<boolean | SocialLinkError>
  abstract findMore(
    paginationParams: Partial<IPaginationParams>,
    queryParams: ISocialLinkQueryParams
  ): Promise<IPaginationResult<SocialLink> | SocialLinkError>
  abstract findById(id: string): Promise<SocialLink | SocialLinkError>
}
