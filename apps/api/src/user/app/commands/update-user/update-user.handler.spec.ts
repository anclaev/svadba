/* eslint-disable @typescript-eslint/unbound-method */
import { UserRole, UserStatus } from '#prisma'
import { Test } from '@nestjs/testing'
import { mockDeep } from 'jest-mock-extended'
import { User, USER_ERRORS, UserError, UserRepository } from '../../../domain'
import { UpdateUserCommand } from './update-user.command'
import { UpdateUserHandler } from './update-user.handler'

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler
  const userRepository = mockDeep<UserRepository>()
  const mockUserId = 'user-123'
  const mockExistingUser = User.create({
    id: mockUserId,
    login: 'old@email.com',
    name: 'Old Name',
    password: 'oldPassword',
    role: 'PUBLIC',
    status: 'BLOCKED',
    telegramId: null,
    guestId: null,
    isTelegramVerified: false,
    credentials: [],
  })

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateUserHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<UpdateUserHandler>(UpdateUserHandler)
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('должен вернуть ошибку USER_NOT_FOUND если пользователь не найден', async () => {
      userRepository.findById.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )

      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, {})
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(USER_ERRORS.USER_NOT_FOUND)
      expect(userRepository.findById).toHaveBeenCalledWith(mockUserId)
    })

    it('должен вернуть ошибку USER_LOGIN_ALREADY_EXISTS если логин уже занят', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByLogin.mockResolvedValue(
        User.create({ ...mockExistingUser, id: 'other-user' })
      )

      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { login: 'new@email.com' })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(
        USER_ERRORS.USER_LOGIN_ALREADY_EXISTS
      )
      expect(userRepository.findByLogin).toHaveBeenCalledWith('new@email.com')
    })

    it('должен обновить логин если он свободен', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByLogin.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      userRepository.update.mockResolvedValue(mockExistingUser)

      const newLogin = 'new@email.com'
      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { login: newLogin })
      )

      expect(result).toBeInstanceOf(User)
      expect((result as User).login).toBe(newLogin)
    })

    it('должен обновить имя пользователя', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.update.mockResolvedValue(mockExistingUser)

      const newName = 'New Name'
      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { name: newName })
      )

      expect(result).toBeInstanceOf(User)
      expect((result as User).name).toBe(newName)
    })

    it('должен обновить пароль', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.update.mockResolvedValue(mockExistingUser)
      const updatePasswordSpy = jest.spyOn(mockExistingUser, 'updatePassword')

      const newPassword = 'newPassword123'
      await handler.execute(
        new UpdateUserCommand(mockUserId, { password: newPassword })
      )

      expect(updatePasswordSpy).toHaveBeenCalledWith(newPassword.trim())
    })

    it('должен вернуть ошибку USER_TELEGRAM_ID_ALREADY_EXISTS если telegramId уже занят', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByTelegramId.mockResolvedValue(
        User.create({ ...mockExistingUser, id: 'other-user' })
      )

      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { telegramId: 123456 })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(
        USER_ERRORS.USER_TELEGRAM_ID_ALREADY_EXISTS
      )
    })

    it('должен обновить telegramId если он свободен', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByTelegramId.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      userRepository.update.mockResolvedValue(mockExistingUser)

      const newTelegramId = 123456
      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { telegramId: newTelegramId })
      )

      expect(result).toBeInstanceOf(User)
      expect((result as User).telegramId).toBe(newTelegramId)
    })

    it('должен вернуть ошибку USER_GUEST_ID_ALREADY_EXISTS если guestId уже занят', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByGuestId.mockResolvedValue(
        User.create({ ...mockExistingUser, id: 'other-user' })
      )

      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { guestId: 'guest-123' })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe(
        USER_ERRORS.USER_GUEST_ID_ALREADY_EXISTS
      )
    })

    it('должен обновить guestId если он свободен', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByGuestId.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      userRepository.update.mockResolvedValue(mockExistingUser)

      const newGuestId = 'guest-123'
      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, { guestId: newGuestId })
      )

      expect(result).toBeInstanceOf(User)
      expect((result as User).guestId).toBe(newGuestId)
    })

    it('должен вызывать commit() перед обновлением', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.update.mockResolvedValue(mockExistingUser)
      const commitSpy = jest.spyOn(mockExistingUser, 'commit')

      await handler.execute(
        new UpdateUserCommand(mockUserId, { name: 'New Name' })
      )

      expect(commitSpy).toHaveBeenCalled()
    })

    it('должен корректно обрабатывать обновление нескольких полей одновременно', async () => {
      userRepository.findById.mockResolvedValue(mockExistingUser)
      userRepository.findByLogin.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      userRepository.findByTelegramId.mockResolvedValue(
        new UserError(USER_ERRORS.USER_NOT_FOUND)
      )
      userRepository.update.mockResolvedValue(mockExistingUser)

      const updateData = {
        login: 'new@email.com',
        name: 'New Name',
        role: UserRole.ADMIN,
        status: UserStatus.ACCEPTED,
      }

      const result = await handler.execute(
        new UpdateUserCommand(mockUserId, updateData)
      )

      expect(result).toBeInstanceOf(User)
      const updatedUser = result as User
      expect(updatedUser.login).toBe(updateData.login)
      expect(updatedUser.name).toBe(updateData.name)
      expect(updatedUser.role).toBe(updateData.role)
      expect(updatedUser.status).toBe(updateData.status)
    })
  })
})
