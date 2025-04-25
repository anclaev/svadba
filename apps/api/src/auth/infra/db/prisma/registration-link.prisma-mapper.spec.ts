import { RegistrationLink as RegistrationLinkEntity } from '#/auth/domain'
import { IRegistrationLinkPrismaModel, IUserPrismaModel } from '#/common/models'
import { IUserModel } from '#/user/domain'
import { UserPrismaMapper } from '#/user/infra'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { mock, mockDeep } from 'jest-mock-extended'

import { RegistrationLinkPrismaMapper } from './registration-link.prisma-mapper'

describe('RegistrationLinkPrismaMapper', () => {
  const mockUserModel = mock<IUserModel>()
  const mockPrismaUserModel = mock<IRegistrationLinkPrismaModel['owner']>()
  const mockDate = new Date('2023-01-01T00:00:00.000Z')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('toModel', () => {
    it('должен обрабатывать undefined createdAt, используя значение entity', () => {
      const entity = mockDeep<RegistrationLinkEntity>({
        owner: { ...mockUserModel, credentials: [] },
        createdAt: undefined,
      })

      jest
        .spyOn(UserPrismaMapper, 'toModel')
        .mockReturnValue(mockPrismaUserModel as IUserPrismaModel)

      const result = RegistrationLinkPrismaMapper.toModel(entity)

      expect(result.createdAt).toBeUndefined()
    })
  })

  describe('toEntity', () => {
    it('должен преобразовывать IRegistrationLinkPrismaModel в RegistrationLinkEntity', () => {
      const mockMeta = { key: 'value' }
      const model = mockDeep<IRegistrationLinkPrismaModel>({
        meta: mockMeta,
        owner: mockPrismaUserModel,
        createdAt: mockDate.toISOString(),
        expiresAt: mockDate.toISOString(),
      })

      const fromModelSpy = jest.spyOn(RegistrationLinkEntity, 'fromModel')

      const result = RegistrationLinkPrismaMapper.toEntity(model)

      expect(fromModelSpy).toHaveBeenCalledWith({
        ...model,
        meta: mockMeta as InputJsonValue,
        owner: mockPrismaUserModel as unknown as IUserModel,
        createdAt: mockDate,
        expiresAt: mockDate,
      })
      expect(result).toBeInstanceOf(RegistrationLinkEntity)
    })

    it('должен корректно обрабатывать разные типы meta', () => {
      const model = mockDeep<IRegistrationLinkPrismaModel>({
        meta: null,
        owner: mockPrismaUserModel,
        createdAt: mockDate.toISOString(),
        expiresAt: mockDate.toISOString(),
      })

      const fromModelSpy = jest.spyOn(RegistrationLinkEntity, 'fromModel')

      RegistrationLinkPrismaMapper.toEntity(model)

      expect(fromModelSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: null as unknown as InputJsonValue,
        })
      )
    })
  })
})
