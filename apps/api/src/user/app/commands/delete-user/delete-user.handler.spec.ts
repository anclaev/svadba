/* eslint-disable @typescript-eslint/unbound-method */
import { UserError, UserRepository } from '#/user/domain'
import { Test } from '@nestjs/testing'
import { mockDeep } from 'jest-mock-extended'
import { DeleteUserCommand } from './delete-user.command'
import { DeleteUserHandler } from './delete-user.handler'

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler
  const userRepository = mockDeep<UserRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile()

    handler = module.get<DeleteUserHandler>(DeleteUserHandler)
    jest.clearAllMocks()
  })

  describe('execute', () => {
    const mockDto = {
      id: 'user-123',
    }

    it('должен вернуть true при успешном удалении пользователя', async () => {
      userRepository.delete.mockResolvedValue(true)

      const result = await handler.execute(
        new DeleteUserCommand({ ...mockDto })
      )

      expect(result).toBe(true)
      expect(userRepository.delete).toHaveBeenCalledWith(mockDto.id)
    })

    it('должен вернуть ошибку USER_NOT_FOUND если пользователь не найден', async () => {
      userRepository.delete.mockResolvedValue(false)

      const result = await handler.execute(
        new DeleteUserCommand({ ...mockDto })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe('USER_NOT_FOUND')
      expect(userRepository.delete).toHaveBeenCalledWith(mockDto.id)
    })

    it('должен вернуть ошибку USER_NOT_FOUND если репозиторий вернул false', async () => {
      userRepository.delete.mockResolvedValue(false)

      const result = await handler.execute(
        new DeleteUserCommand({ ...mockDto })
      )

      expect(result).toBeInstanceOf(UserError)
      expect((result as UserError).message).toBe('USER_NOT_FOUND')
    })

    it('должен корректно обрабатывать ошибку из репозитория', async () => {
      const error = new Error('Database error')
      userRepository.delete.mockRejectedValue(error)

      await expect(
        handler.execute(new DeleteUserCommand({ ...mockDto }))
      ).rejects.toThrow(error)
    })
  })
})
