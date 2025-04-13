import { Injectable } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { ITimingEventPrismaModel } from '#/common/models'

import { paginate, paginateOutput } from '#/common/pagination'
import { PrismaService } from '#/core/prisma.service'

import {
  ITimingEventQueryParams,
  TimingEvent,
  TimingEventError,
  TimingEventRepository,
} from '#/svadba/domain'

import { TimingEventPrismaMapper } from './timing-event.prisma-mapper'

@Injectable()
export class TimingEventPrismaRepository extends TimingEventRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(entity: TimingEvent): Promise<TimingEvent | TimingEventError> {
    const { iconId, ownerId, ...model } =
      TimingEventPrismaMapper.toModel(entity)

    try {
      const createdTimingEvent = await this.prisma.timingEvent.create({
        data: {
          ...model,
          icon: iconId
            ? {
                connect: {
                  id: iconId,
                },
              }
            : undefined,
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        include: { owner: true, icon: true },
      })

      return TimingEventPrismaMapper.toEntity(
        createdTimingEvent as ITimingEventPrismaModel
      )
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }

  async update(entity: TimingEvent): Promise<TimingEvent | TimingEventError> {
    const model = TimingEventPrismaMapper.toModel(entity)

    try {
      const updatedTimingEvent = await this.prisma.timingEvent.update({
        where: {
          id: model.id,
        },
        data: {
          ...model,
          ownerId: undefined,
          owner: {
            connect: {
              id: model.ownerId,
            },
          },
          iconId: undefined,
          icon: model.icon
            ? {
                connect: {
                  id: model.iconId!,
                },
              }
            : undefined,
        },
      })

      return TimingEventPrismaMapper.toEntity(
        updatedTimingEvent as ITimingEventPrismaModel
      )
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | TimingEventError> {
    try {
      return !!(await this.prisma.timingEvent.delete({ where: { id } }))
    } catch {
      return new TimingEventError('TIMING_EVENT_NOT_FOUND')
    }
  }

  async exists(id: string): Promise<boolean | TimingEventError> {
    try {
      return !!(await this.prisma.timingEvent.findUnique({ where: { id } }))
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<TimingEvent | TimingEventError> {
    try {
      const TimingEvent = await this.prisma.timingEvent.findUnique({
        where: { id },
      })

      return TimingEvent
        ? TimingEventPrismaMapper.toEntity(
            TimingEvent as ITimingEventPrismaModel
          )
        : new TimingEventError('TIMING_EVENT_NOT_FOUND')
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }

  async findByOrder(order: number): Promise<TimingEvent | TimingEventError> {
    try {
      const TimingEvent = await this.prisma.timingEvent.findUnique({
        where: { order },
      })

      return TimingEvent
        ? TimingEventPrismaMapper.toEntity(
            TimingEvent as ITimingEventPrismaModel
          )
        : new TimingEventError('TIMING_EVENT_NOT_FOUND')
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: ITimingEventQueryParams
  ): Promise<IPaginationResult<TimingEvent> | TimingEventError> {
    try {
      const [timingEvents, total] = await Promise.all([
        await this.prisma.timingEvent.findMany({
          ...paginate(paginationParams),
          where: {
            time: queryParams.time
              ? {
                  contains: queryParams.time,
                }
              : undefined,
            title: queryParams.title
              ? {
                  contains: queryParams.title,
                }
              : undefined,
            isPublic: queryParams.isPublic
              ? {
                  equals: queryParams.isPublic,
                }
              : undefined,
            iconId: queryParams.iconId
              ? {
                  equals: queryParams.iconId,
                }
              : undefined,
            ownerId: queryParams.ownerId
              ? {
                  equals: queryParams.ownerId,
                }
              : undefined,
          },
        }),
        await this.prisma.timingEvent.count(),
      ])

      return paginateOutput<TimingEvent>(
        (timingEvents as ITimingEventPrismaModel[]).map((timingEvent) =>
          TimingEventPrismaMapper.toEntity(timingEvent)
        ),
        total,
        paginationParams
      )
    } catch {
      return new TimingEventError('TIMING_EVENT_UNKNOWN_ERROR')
    }
  }
}
