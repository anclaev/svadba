import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRepository } from '#/common/interfaces'

import { TimingEvent } from '../entities'
import { ITimingEventQueryParams, TimingEventError } from '../interfaces'

export abstract class TimingEventRepository
  implements IRepository<TimingEvent, TimingEventError>
{
  abstract create(entity: TimingEvent): Promise<TimingEvent | TimingEventError>
  abstract update(entity: TimingEvent): Promise<TimingEvent | TimingEventError>
  abstract delete(id: string): Promise<boolean | TimingEventError>
  abstract exists(id: string): Promise<boolean | TimingEventError>
  abstract findMore(
    paginationParams: IPaginationParams,
    queryParams: ITimingEventQueryParams
  ): Promise<IPaginationResult<TimingEvent> | TimingEventError>
  abstract findById(id: string): Promise<TimingEvent | TimingEventError>
  abstract findByOrder(order: number): Promise<TimingEvent | TimingEventError>
}
