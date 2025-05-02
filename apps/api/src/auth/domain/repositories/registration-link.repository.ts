import { IRepository } from '#/common/interfaces'
import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { RegistrationLink } from '../entities'
import {
  IRegistrationLinkQueryParams,
  RegistrationLinkError,
} from '../interfaces'

export abstract class RegistrationLinkRepository
  implements IRepository<RegistrationLink, RegistrationLinkError>
{
  abstract create(
    entity: RegistrationLink
  ): Promise<RegistrationLink | RegistrationLinkError>
  abstract update(
    entity: RegistrationLink
  ): Promise<RegistrationLink | RegistrationLinkError>
  abstract delete(id: string): Promise<boolean | RegistrationLinkError>
  abstract deleteExpired(date: Date): Promise<number | RegistrationLinkError>
  abstract exists(id: string): Promise<boolean | RegistrationLinkError>
  abstract findMore(
    paginationParams: Partial<IPaginationParams>,
    queryParams: Partial<IRegistrationLinkQueryParams>
  ): Promise<IPaginationResult<RegistrationLink> | RegistrationLinkError>
  abstract findById(
    id: string
  ): Promise<RegistrationLink | RegistrationLinkError>
}
