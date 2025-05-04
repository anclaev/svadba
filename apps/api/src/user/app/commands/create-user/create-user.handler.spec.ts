/* eslint-disable @typescript-eslint/unbound-method */
import { UserRole, UserStatus } from '#prisma'
import { Test } from '@nestjs/testing'
import * as argon2 from 'argon2'
import { mockDeep } from 'jest-mock-extended'
import { v4 } from 'uuid'

import { User, USER_ERRORS, UserError, UserRepository } from '../../../domain'
import { CreateUserCommand } from './create-user.command'
import { CreateUserHandler } from './create-user.handler'

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler
  const userRepository = mockDeep<UserRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<CreateUserHandler>(CreateUserHandler)
    jest.clearAllMocks()
  })

  describe('execute', () => {
    const mockDto = {
      login: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    }

    const mockUser = User.create({
      id: v4(),
      login: mockDto.login,
      name: mockDto.name,
      status: UserStatus.CREATED,
      role: UserRole.PUBLIC,
      telegramId: null,
      isTelegramVerified: false,
      credentials: [],
      password: 'hashedPassword',
    })

    it('должен вернуть ошибку, если пользователь уже существует', async () => {
      userRepository.exists.mockResolvedValue(true)

      const result = await handler.execute(
        new CreateUserCommand({ ...mockDto })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe('USER_ALREADY_EXISTS')
      expect(userRepository.exists).toHaveBeenCalledWith(mockDto.login.trim())
      expect(userRepository.create).not.toHaveBeenCalled()
    })

    it('должен создать нового пользователя, если он не существует', async () => {
      userRepository.exists.mockResolvedValue(false)
      userRepository.create.mockResolvedValue(mockUser)
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword')

      const result = await handler.execute(
        new CreateUserCommand({ ...mockDto })
      )

      expect(result).toBeInstanceOf(User)
      expect(userRepository.exists).toHaveBeenCalledWith(mockDto.login.trim())
      expect(argon2.hash).toHaveBeenCalledWith(mockDto.password)
      expect(userRepository.create).toHaveBeenCalled()

      const createdUser = result as User
      expect(createdUser.login).toBe(mockDto.login)
      expect(createdUser.name).toBe(mockDto.name)
      expect(createdUser.status).toBe(UserStatus.CREATED)
      expect(createdUser.role).toBe(UserRole.PUBLIC)
    })

    it('должен вызвать commit() при успешном создании пользователя', async () => {
      userRepository.exists.mockResolvedValue(false)
      userRepository.create.mockResolvedValue(mockUser)
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword')
      const commitSpy = jest.spyOn(mockUser, 'commit')

      await handler.execute(new CreateUserCommand({ ...mockDto }))

      expect(commitSpy).toHaveBeenCalled()
    })

    it('должен корректно обрабатывать пробелы в логине', async () => {
      const dtoWithSpaces = { ...mockDto, login: '  test@example.com  ' }
      userRepository.exists.mockResolvedValue(false)
      userRepository.create.mockResolvedValue(mockUser)
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword')

      const result = await handler.execute(
        new CreateUserCommand({ ...dtoWithSpaces })
      )

      expect(result).toBeInstanceOf(User)
      expect(userRepository.exists).toHaveBeenCalledWith('test@example.com')
    })

    it('должен вернуть ошибку, если repository.create вернул ошибку', async () => {
      userRepository.exists.mockResolvedValue(false)
      const error = new UserError('USER_UNKNOWN_ERROR')
      userRepository.create.mockResolvedValue(error)
      jest.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword')

      const result = await handler.execute(
        new CreateUserCommand({ ...mockDto })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_UNKNOWN_ERROR)
    })
  })
})
