import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import { Guest } from '../entities'
import { GuestError, IGuestQueryParams } from '../interfaces'

export abstract class GuestRepository
  implements IRepository<Guest, GuestError>
{
  abstract create(entity: Guest): Promise<Guest | GuestError>
  abstract update(entity: Guest): Promise<Guest | GuestError>
  abstract delete(id: string): Promise<boolean | GuestError>
  abstract exists(id: string): Promise<boolean | GuestError>
  abstract findMore(
    paginationParams: IPaginationParams,
    queryParams: IGuestQueryParams
  ): Promise<IPaginationResult<Guest> | GuestError>
  abstract findById(id: string): Promise<Guest | GuestError>
  abstract findByUserId(userId: string): Promise<Guest | GuestError>
}
