import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import { IUserQueryParams, User, UserError } from '../../domain'

export abstract class UserRepository implements IRepository<User, UserError> {
  abstract create(entity: User): Promise<User | UserError>
  abstract update(entity: User): Promise<User | UserError>
  abstract delete(id: string): Promise<boolean | UserError>
  abstract exists(login: string): Promise<boolean | UserError>
  abstract findMore(
    paginationParams: IPaginationParams,
    queryParams: IUserQueryParams
  ): Promise<IPaginationResult<User> | UserError>
  abstract findById(id: string): Promise<User | UserError>
  abstract findByLogin(login: string): Promise<User | UserError>
}
