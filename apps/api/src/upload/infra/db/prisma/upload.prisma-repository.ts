import { Injectable } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IUploadPrismaModel } from '#/common/models'
import { paginate, paginateOutput } from '#/common/pagination'

import { PrismaService } from '#/core/prisma.service'

import {
  IUploadQueryParams,
  Upload,
  UploadError,
  UploadRepository,
} from '#/upload/domain'

import { UploadPrismaMapper } from './upload.prisma-mapper'

@Injectable()
export class UploadPrismaRepository extends UploadRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(entity: Upload): Promise<Upload | UploadError> {
    const { ownerId, ...model } = UploadPrismaMapper.toModel(entity)

    try {
      const createdUpload = await this.prisma.upload.create({
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

      return UploadPrismaMapper.toEntity(createdUpload)
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }

  async update(entity: Upload): Promise<Upload | UploadError> {
    const model = UploadPrismaMapper.toModel(entity)

    try {
      const updatedUpload = await this.prisma.upload.update({
        where: {
          id: model.id,
        },
        data: {
          ...model,
          ownerId: undefined,
          owner: entity.owner
            ? {
                connect: {
                  id: entity.ownerId,
                },
              }
            : undefined,
        },
        include: { owner: true },
      })

      return UploadPrismaMapper.toEntity(updatedUpload)
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | UploadError> {
    try {
      return !!(await this.prisma.upload.delete({ where: { id } }))
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }

  async exists(id: string): Promise<boolean | UploadError> {
    try {
      return !!(await this.prisma.upload.findUnique({ where: { id } }))
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<Upload | UploadError> {
    try {
      const upload = await this.prisma.upload.findUnique({ where: { id } })

      return upload
        ? UploadPrismaMapper.toEntity(upload as IUploadPrismaModel)
        : new UploadError('UPLOAD_NOT_FOUND')
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: IUploadQueryParams
  ): Promise<IPaginationResult<Upload> | UploadError> {
    try {
      const [uploads, total] = await Promise.all([
        await this.prisma.upload.findMany({
          ...paginate(paginationParams),
          where: {
            name: queryParams.name
              ? {
                  contains: queryParams.name,
                }
              : undefined,
            filename: queryParams.filename
              ? {
                  contains: queryParams.filename,
                }
              : undefined,
            ext: queryParams.ext
              ? {
                  contains: queryParams.ext,
                }
              : undefined,
            mimetype: queryParams.mimetype
              ? {
                  contains: queryParams.mimetype,
                }
              : undefined,
            ownerId: queryParams.ownerId
              ? {
                  equals: queryParams.ownerId,
                }
              : undefined,
          },
        }),
        await this.prisma.upload.count(),
      ])

      return paginateOutput<Upload>(
        (uploads as IUploadPrismaModel[]).map((upload) =>
          UploadPrismaMapper.toEntity(upload)
        ),
        total,
        paginationParams
      )
    } catch {
      return new UploadError('UPLOAD_UNKNOWN_ERROR')
    }
  }
}
