import { Injectable } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IDresscodeColorPrismaModel } from '#/common/models'

import { paginate, paginateOutput } from '#/common/pagination'
import { PrismaService } from '#/core/prisma.service'

import {
  DresscodeColor,
  DresscodeColorError,
  DresscodeColorRepository,
  IDresscodeColorQueryParams,
} from '#/svadba/domain'

import { DresscodeColorPrismaMapper } from './dresscode-color.prisma-mapper'

@Injectable()
export class DresscodeColorPrismaRepository extends DresscodeColorRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(
    entity: DresscodeColor
  ): Promise<DresscodeColor | DresscodeColorError> {
    const { ownerId, ...model } = DresscodeColorPrismaMapper.toModel(entity)

    try {
      const createdDresscodeColor = await this.prisma.dresscodeColor.create({
        data: {
          ...model,
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
        include: { owner: true },
      })

      return DresscodeColorPrismaMapper.toEntity(
        createdDresscodeColor as IDresscodeColorPrismaModel
      )
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }

  async update(
    entity: DresscodeColor
  ): Promise<DresscodeColor | DresscodeColorError> {
    const model = DresscodeColorPrismaMapper.toModel(entity)

    try {
      const updatedDresscodeColor = await this.prisma.dresscodeColor.update({
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
        },
      })

      return DresscodeColorPrismaMapper.toEntity(
        updatedDresscodeColor as IDresscodeColorPrismaModel
      )
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | DresscodeColorError> {
    try {
      return !!(await this.prisma.dresscodeColor.delete({ where: { id } }))
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_NOT_FOUND')
    }
  }

  async exists(id: string): Promise<boolean | DresscodeColorError> {
    try {
      return !!(await this.prisma.dresscodeColor.findUnique({ where: { id } }))
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<DresscodeColor | DresscodeColorError> {
    try {
      const DresscodeColor = await this.prisma.dresscodeColor.findUnique({
        where: { id },
      })

      return DresscodeColor
        ? DresscodeColorPrismaMapper.toEntity(
            DresscodeColor as IDresscodeColorPrismaModel
          )
        : new DresscodeColorError('DRESSCODE_COLOR_NOT_FOUND')
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }

  async findByHex(hex: string): Promise<DresscodeColor | DresscodeColorError> {
    try {
      const DresscodeColor = await this.prisma.dresscodeColor.findUnique({
        where: { hex },
      })

      return DresscodeColor
        ? DresscodeColorPrismaMapper.toEntity(
            DresscodeColor as IDresscodeColorPrismaModel
          )
        : new DresscodeColorError('DRESSCODE_COLOR_NOT_FOUND')
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: IDresscodeColorQueryParams
  ): Promise<IPaginationResult<DresscodeColor> | DresscodeColorError> {
    try {
      const [dresscodeColors, total] = await Promise.all([
        await this.prisma.dresscodeColor.findMany({
          ...paginate(paginationParams),
          where: {
            hex: queryParams.hex
              ? {
                  contains: queryParams.hex,
                }
              : undefined,
            description: queryParams.description
              ? {
                  contains: queryParams.description,
                }
              : undefined,
            isHidden: queryParams.isHidden
              ? {
                  equals: queryParams.isHidden,
                }
              : undefined,
            ownerId: queryParams.ownerId
              ? {
                  equals: queryParams.ownerId,
                }
              : undefined,
          },
        }),
        await this.prisma.dresscodeColor.count(),
      ])

      return paginateOutput<DresscodeColor>(
        (dresscodeColors as IDresscodeColorPrismaModel[]).map(
          (dresscodeColor) =>
            DresscodeColorPrismaMapper.toEntity(dresscodeColor)
        ),
        total,
        paginationParams
      )
    } catch {
      return new DresscodeColorError('DRESSCODE_COLOR_UNKNOWN_ERROR')
    }
  }
}
