import { IPaginationParams, IPaginationResult } from '@repo/shared'

export interface IRepository<Entity, EntityError> {
  exists?(id: string): Promise<boolean | EntityError>
  create(entity: Entity): Promise<Entity | EntityError>
  update(entity: Entity): Promise<Entity | EntityError>
  delete(id: string): Promise<boolean | EntityError>
  findById(id: string): Promise<Entity | EntityError>
  findByUnique?(field: keyof Entity): Promise<Entity | EntityError>
  findMore(
    paginationParams: Partial<IPaginationParams>,
    queryParams: unknown
  ): Promise<IPaginationResult<Entity> | EntityError>
}
