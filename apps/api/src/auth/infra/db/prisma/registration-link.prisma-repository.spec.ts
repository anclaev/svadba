/* eslint-disable @typescript-eslint/unbound-method */
import { RegistrationLink } from '#/auth/domain'
import {
  IRegistrationLinkQueryParams,
  RegistrationLinkError,
} from '#/auth/domain/interfaces'
import { IRegistrationLinkPrismaModel } from '#/common/models'
import { PrismaService } from '#/core/prisma.service'
import { IPaginationParams } from '@repo/shared'
import { mock, mockDeep } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'
import { RegistrationLinkPrismaMapper } from './registration-link.prisma-mapper'
import { RegistrationLinkPrismaRepository } from './registration-link.prisma-repository'

describe('RegistrationLinkPrismaRepository', () => {
  const mockPrisma = mockDeep<PrismaService>()
  const repository = new RegistrationLinkPrismaRepository(mockPrisma)
  const mockOwnerId = uuid()

  const mockRegistrationLink = mock<RegistrationLink>()
  const mockPrismaModel = mockDeep<IRegistrationLinkPrismaModel>()
  const mockError = new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    // jest.mock('#/common/pagination', () => ({
    //     paginate: jest.fn().mockReturnValue({ skip: 0, take: 10 }),
    //     paginateOutput: jest.fn().mockImplementation((items, total, params) => ({
    //       items,
    //       total,
    //       ...params,
    //       page: params.page,
    //       limit: params.limit,
    //       totalPages: Math.ceil(total / params.limit)
    //     }))
    //   }))
  })

  describe('create', () => {
    it('должен успешно создать ссылку регистрации', async () => {
      jest
        .spyOn(RegistrationLinkPrismaMapper, 'toModel')
        .mockReturnValue({ ...mockPrismaModel, ownerId: mockOwnerId })
      jest
        .spyOn(RegistrationLinkPrismaMapper, 'toEntity')
        .mockReturnValue(mockRegistrationLink)

      mockPrisma.registrationLink.create.mockResolvedValue(mockPrismaModel)

      const result = await repository.create(mockRegistrationLink)

      expect(result).toBe(mockRegistrationLink)
      expect(mockPrisma.registrationLink.create).toHaveBeenCalledWith({
        data: {
          ...mockPrismaModel,
          meta: {},
          ownerId: undefined,
          owner: { connect: { id: mockOwnerId } },
        },
        include: { owner: true },
      })
    })

    it('должен вернуть ошибку при неудачном создании', async () => {
      jest
        .spyOn(RegistrationLinkPrismaMapper, 'toModel')
        .mockReturnValue({ ...mockPrismaModel, ownerId: mockOwnerId })
      mockPrisma.registrationLink.create.mockRejectedValue(new Error())

      const result = await repository.create(mockRegistrationLink)

      expect(result).toEqual(mockError)
    })
  })

  describe('update', () => {
    it('должен успешно обновить ссылку регистрации', async () => {
      jest.spyOn(RegistrationLinkPrismaMapper, 'toModel').mockReturnValue({
        ...mockPrismaModel,
        id: mockOwnerId,
        ownerId: mockOwnerId,
      })
      jest
        .spyOn(RegistrationLinkPrismaMapper, 'toEntity')
        .mockReturnValue(mockRegistrationLink)

      mockPrisma.registrationLink.update.mockResolvedValue(mockPrismaModel)

      const result = await repository.update(mockRegistrationLink)

      expect(result).toBe(mockRegistrationLink)
      expect(mockPrisma.registrationLink.update).toHaveBeenCalledWith({
        where: { id: mockOwnerId },
        data: {
          ...mockPrismaModel,
          id: mockOwnerId,
          meta: {},
          ownerId: undefined,
          owner: { connect: { id: mockOwnerId } },
        },
        include: { owner: true },
      })
    })

    it('должен вернуть ошибку при неудачном обновлении', async () => {
      jest.spyOn(RegistrationLinkPrismaMapper, 'toModel').mockReturnValue({
        ...mockPrismaModel,
        id: mockOwnerId,
        ownerId: mockOwnerId,
      })
      mockPrisma.registrationLink.update.mockRejectedValue(new Error())

      const result = await repository.update(mockRegistrationLink)

      expect(result).toEqual(mockError)
    })
  })

  describe('delete', () => {
    it('должен успешно удалить ссылку регистрации', async () => {
      mockPrisma.registrationLink.delete.mockResolvedValue(mockPrismaModel)

      const result = await repository.delete(mockOwnerId)

      expect(result).toBe(true)
      expect(mockPrisma.registrationLink.delete).toHaveBeenCalledWith({
        where: { id: mockOwnerId },
      })
    })

    it('должен вернуть ошибку если ссылка не найдена', async () => {
      mockPrisma.registrationLink.delete.mockRejectedValue(new Error())

      const result = await repository.delete(mockOwnerId)

      expect(result).toEqual(
        new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
      )
    })
  })

  describe('exists', () => {
    it('должен вернуть true если ссылка существует', async () => {
      mockPrisma.registrationLink.findUnique.mockResolvedValue(mockPrismaModel)

      const result = await repository.exists(mockOwnerId)

      expect(result).toBe(true)
    })

    it('должен вернуть false если ссылка не существует', async () => {
      mockPrisma.registrationLink.findUnique.mockResolvedValue(null)

      const result = await repository.exists(mockOwnerId)

      expect(result).toBe(false)
    })

    it('должен вернуть ошибку при неудачном запросе', async () => {
      mockPrisma.registrationLink.findUnique.mockRejectedValue(new Error())

      const result = await repository.exists(mockOwnerId)

      expect(result).toEqual(
        new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
      )
    })
  })

  describe('findById', () => {
    it('должен успешно найти ссылку по id', async () => {
      mockPrisma.registrationLink.findUnique.mockResolvedValue(mockPrismaModel)
      jest
        .spyOn(RegistrationLinkPrismaMapper, 'toEntity')
        .mockReturnValue(mockRegistrationLink)

      const result = await repository.findById(mockOwnerId)

      expect(result).toBe(mockRegistrationLink)
      expect(mockPrisma.registrationLink.findUnique).toHaveBeenCalledWith({
        where: { id: mockOwnerId },
        include: { owner: true },
      })
    })

    it('должен вернуть ошибку если ссылка не найдена', async () => {
      mockPrisma.registrationLink.findUnique.mockResolvedValue(null)

      const result = await repository.findById(mockOwnerId)

      expect(result).toEqual(
        new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
      )
    })

    it('должен вернуть ошибку при неудачном запросе', async () => {
      mockPrisma.registrationLink.findUnique.mockRejectedValue(new Error())

      const result = await repository.findById(mockOwnerId)

      expect(result).toEqual(mockError)
    })
  })

  describe('findMore', () => {
    const mockPagination: IPaginationParams = { page: 1, size: 10 }
    const mockQuery: IRegistrationLinkQueryParams = {
      isActive: true,
      isExpired: false,
      ownerId: mockOwnerId,
      status: 'PENDING',
    }

    // it('должен успешно вернуть список ссылок', async () => {
    //   const mockLinks = [mockPrismaModel, mockPrismaModel]
    //   const mockResult = mockDeep<IPaginationResult<RegistrationLink>>()

    //   mockPrisma.registrationLink.findMany.mockResolvedValue(mockLinks)
    //   mockPrisma.registrationLink.count.mockResolvedValue(2)
    //   jest
    //     .spyOn(RegistrationLinkPrismaMapper, 'toEntity')
    //     .mockReturnValue(mockRegistrationLink)
    //   jest.spyOn(pagination, 'paginateOutput').mockReturnValue(mockResult)

    //   const result = await repository.findMore(mockPagination, mockQuery)

    //   expect(result).toBe(mockResult)
    //   expect(mockPrisma.registrationLink.findMany).toHaveBeenCalledWith({
    //     ...expect.anything(),
    //     where: {
    //       isActive: { equals: true },
    //       status: undefined,
    //       expiresAt: undefined,
    //       ownerId: undefined,
    //     },
    //   })
    // })

    it('должен вернуть ошибку при неудачном запросе', async () => {
      mockPrisma.registrationLink.findMany.mockRejectedValue(new Error())

      const result = await repository.findMore(mockPagination, mockQuery)

      expect(result).toEqual(mockError)
    })
  })
})
