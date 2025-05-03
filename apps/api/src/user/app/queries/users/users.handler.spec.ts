/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing'
import { IPaginationResult } from '@repo/shared'
import { mock } from 'jest-mock-extended'

import { User, USER_ERRORS, UserError, UserRepository } from '../../../domain'

import { UsersHandler } from './users.handler'
import { UsersQuery } from './users.query'

describe('UsersHandler', () => {
  let handler: UsersHandler
  const userRepository = mock<UserRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<UsersHandler>(UsersHandler)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('должен вызывать repository.findMore с правильными параметрами', async () => {
      const mockQueryParams = { name: 'Test' }
      const mockPagination = { page: 1, size: 10 }
      const mockDto = { ...mockPagination, ...mockQueryParams }
      const query = new UsersQuery(mockDto)

      const expectedResult: IPaginationResult<User> = {
        data: [{ id: '1', name: 'Test' } as User],
        meta: {
          total: 1,
          currentPage: 1,
          lastPage: 1,
          nextPage: 0,
          prevPage: 0,
          totalPerPage: 10,
        },
      }

      userRepository.findMore.mockResolvedValue(expectedResult)

      const result = await handler.execute(query)

      expect(userRepository.findMore).toHaveBeenCalledWith(
        mockPagination,
        mockQueryParams
      )
      expect(result).toEqual(expectedResult)
    })

    it('должен возвращать ошибку, если repository.findMore выбрасывает исключение', async () => {
      const mockDto = { page: 1, size: 10 }
      const query = new UsersQuery(mockDto)

      userRepository.findMore.mockResolvedValue(
        new UserError(USER_ERRORS.USER_UNKNOWN_ERROR)
      )

      const result = await handler.execute(query)

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_UNKNOWN_ERROR)
    })

    it('должен правильно разделять пагинацию и query параметры', async () => {
      const mockDto = {
        page: 2,
        size: 20,
        name: 'John',
        login: 'john@example.com',
      }
      const query = new UsersQuery(mockDto)

      const expectedPagination = { page: 2, size: 20 }
      const expectedQueryParams = { name: 'John', login: 'john@example.com' }

      await handler.execute(query)

      expect(userRepository.findMore).toHaveBeenCalledWith(
        expectedPagination,
        expectedQueryParams
      )
    })
  })
})
