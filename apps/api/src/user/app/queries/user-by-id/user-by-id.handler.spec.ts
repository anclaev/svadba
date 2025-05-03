/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'

import { User, USER_ERRORS, UserError, UserRepository } from '../../../domain'

import { UserByIdHandler } from './user-by-id.handler'
import { UserByIdQuery } from './user-by-id.query'

describe('UserByIdHandler', () => {
  let handler: UserByIdHandler
  const userRepository = mock<UserRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserByIdHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<UserByIdHandler>(UserByIdHandler)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('должен вернуть пользователя, если он найден по ID', async () => {
      const mockId = uuid()

      const mockUser: User = {
        id: mockId,
        login: 'login',
        name: 'Test User',
      } as User

      userRepository.findById.mockResolvedValue(mockUser)
      const query = new UserByIdQuery(mockId)

      const result = await handler.execute(query)

      expect(userRepository.findById).toHaveBeenCalledWith(mockId)
      expect(result).toEqual(mockUser)
    })

    it('должен вернуть UserError, если пользователь не найден', async () => {
      const mockId = uuid()

      userRepository.findById.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      const query = new UserByIdQuery(mockId)

      const result = await handler.execute(query)

      expect(userRepository.findById).toHaveBeenCalledWith(mockId)
      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_NOT_FOUND)
    })

    it('должен вернуть UserError при возникновении исключения в репозитории', async () => {
      const mockId = uuid()

      userRepository.findById.mockResolvedValue(
        new UserError(USER_ERRORS.USER_UNKNOWN_ERROR)
      )
      const query = new UserByIdQuery(mockId)

      const result = await handler.execute(query)

      expect(userRepository.findById).toHaveBeenCalledWith(mockId)
      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_UNKNOWN_ERROR)
    })

    it('должен передавать точное значение ID в репозиторий', async () => {
      const mockId = uuid()
      const query = new UserByIdQuery(mockId)

      await handler.execute(query)

      expect(userRepository.findById).toHaveBeenCalledWith(mockId)
    })
  })
})
