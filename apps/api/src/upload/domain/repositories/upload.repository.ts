import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import { IUploadQueryParams, Upload, UploadError } from '#/upload/domain'

export abstract class UploadRepository
  implements IRepository<Upload, UploadError>
{
  abstract create(entity: Upload): Promise<Upload | UploadError>
  abstract update(entity: Upload): Promise<Upload | UploadError>
  abstract delete(id: string): Promise<boolean | UploadError>
  abstract exists(id: string): Promise<boolean | UploadError>
  abstract findMore(
    paginationParams: IPaginationParams,
    queryParams: IUploadQueryParams
  ): Promise<IPaginationResult<Upload> | UploadError>
  abstract findById(id: string): Promise<Upload | UploadError>
}
