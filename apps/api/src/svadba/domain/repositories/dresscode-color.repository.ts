import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import { DresscodeColor } from '../entities'
import { DresscodeColorError, IDresscodeColorQueryParams } from '../interfaces'

export abstract class DresscodeColorRepository
  implements IRepository<DresscodeColor, DresscodeColorError>
{
  abstract create(
    entity: DresscodeColor
  ): Promise<DresscodeColor | DresscodeColorError>
  abstract update(
    entity: DresscodeColor
  ): Promise<DresscodeColor | DresscodeColorError>
  abstract delete(id: string): Promise<boolean | DresscodeColorError>
  abstract exists(id: string): Promise<boolean | DresscodeColorError>
  abstract findMore(
    paginationParams: IPaginationParams,
    queryParams: IDresscodeColorQueryParams
  ): Promise<IPaginationResult<DresscodeColor> | DresscodeColorError>
  abstract findById(id: string): Promise<DresscodeColor | DresscodeColorError>
  abstract findByHex(hex: string): Promise<DresscodeColor | DresscodeColorError>
}
