/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'

import { User, USER_ERRORS, UserError, UserRepository } from '../../../domain'

import { UserByLoginHandler } from './user-by-login.handler'
import { UserByLoginQuery } from './user-by-login.query'

describe('UserByLoginHandler', () => {
  let handler: UserByLoginHandler
  const userRepository = mock<UserRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserByLoginHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<UserByLoginHandler>(UserByLoginHandler)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('должен вернуть пользователя, если он найден по логину', async () => {
      const mockLogin = 'testUser'
      const mockUser: User = {
        id: '1',
        login: mockLogin,
        name: 'Test User',
      } as User

      userRepository.findByLogin.mockResolvedValue(mockUser)
      const query = new UserByLoginQuery(mockLogin)

      const result = await handler.execute(query)

      expect(userRepository.findByLogin).toHaveBeenCalledWith(mockLogin)
      expect(result).toEqual(mockUser)
    })

    it('должен вернуть UserError, если пользователь не найден', async () => {
      const mockLogin = 'nonExistentUser'

      userRepository.findByLogin.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      const query = new UserByLoginQuery(mockLogin)

      const result = await handler.execute(query)

      expect(userRepository.findByLogin).toHaveBeenCalledWith(mockLogin)
      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_NOT_FOUND)
    })

    it('должен вернуть UserError при возникновении исключения в репозитории', async () => {
      const mockLogin = 'errorUser'

      userRepository.findByLogin.mockResolvedValue(
        new UserError(USER_ERRORS.USER_UNKNOWN_ERROR)
      )
      const query = new UserByLoginQuery(mockLogin)

      const result = await handler.execute(query)

      expect(userRepository.findByLogin).toHaveBeenCalledWith(mockLogin)
      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_UNKNOWN_ERROR)
    })

    it('должен передавать точное значение логина в репозиторий', async () => {
      const mockLogin = 'exactLogin123'
      const query = new UserByLoginQuery(mockLogin)

      await handler.execute(query)

      expect(userRepository.findByLogin).toHaveBeenCalledWith(mockLogin)
    })
  })
})
