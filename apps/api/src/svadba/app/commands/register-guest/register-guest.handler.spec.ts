/* eslint-disable @typescript-eslint/unbound-method */
import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { mock, MockProxy } from 'jest-mock-extended'
import { v4 as uuid } from 'uuid'

import { CreateUserCommand, DeleteUserCommand } from '#/user/app'
import { USER_ERRORS, UserError } from '#/user/domain'

import { Guest, GUEST_ERRORS, GuestError } from '../../../domain'

import { CreateGuestCommand } from '../create-guest'
import { RegisterGuestCommand } from './register-guest.command'
import { RegisterGuestHandler } from './register-guest.handler'
import { RegisterGuestInput } from './register-guest.input'

describe('RegisterGuestHandler', () => {
  let handler: RegisterGuestHandler
  let commandBus: MockProxy<CommandBus>
  let logger: Logger

  beforeEach(() => {
    commandBus = mock<CommandBus>()
    logger = mock<Logger>()
    handler = new RegisterGuestHandler(commandBus, logger)
  })

  describe('execute', () => {
    const mockDto: RegisterGuestInput = {
      name: 'Test Guest',
      login: 'test',
      password: 'password',
      guestRole: 'GUEST',
      side: 'GROOM',
      answers: { question1: 'answer1' },
    }

    it('должен успешно регистрировать гостя', async () => {
      const mockUser = {
        id: uuid(),
        login: mockDto.login,
        password: mockDto.guestRole,
        name: mockDto.name,
      }

      const mockGuest = mock<Guest>()

      commandBus.execute.mockImplementation((command: any) => {
        if (command instanceof CreateUserCommand) {
          return Promise.resolve(mockUser)
        }
        if (command instanceof CreateGuestCommand) {
          return Promise.resolve(mockGuest)
        }
        return Promise.resolve()
      })

      const result = await handler.execute(new RegisterGuestCommand(mockDto))

      expect(result).toEqual(mockGuest)
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateUserCommand({
          name: mockDto.name,
          login: mockDto.login,
          password: mockDto.password,
        })
      )
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateGuestCommand({
          side: mockDto.side,
          role: mockDto.guestRole,
          userId: mockUser.id,
          answers: mockDto.answers,
        })
      )
      expect(logger.log).toHaveBeenCalledWith(
        `Гость '${mockDto.name}' зарегистрирован!`,
        'Svadba'
      )
    })

    it('должен возвращать ошибку, если логин уже занят', async () => {
      commandBus.execute.mockImplementation((command: any) => {
        if (command instanceof CreateUserCommand) {
          return Promise.resolve(new UserError(USER_ERRORS.USER_ALREADY_EXISTS))
        }
        return Promise.resolve()
      })

      const result = await handler.execute(new RegisterGuestCommand(mockDto))

      expect(result).toBeInstanceOf(GuestError)
      expect((result as GuestError).message).toEqual(
        GUEST_ERRORS.GUEST_ALREADY_EXISTS
      )
      expect(commandBus.execute).toHaveBeenCalledTimes(1)
      expect(logger.log).not.toHaveBeenCalled()
    })

    it('должен вовращать ошибку, если пользователь не создался', async () => {
      commandBus.execute.mockImplementation((command: any) => {
        if (command instanceof CreateUserCommand) {
          return Promise.resolve(new UserError(USER_ERRORS.USER_UNKNOWN_ERROR))
        }
        return Promise.resolve()
      })

      const result = await handler.execute(new RegisterGuestCommand(mockDto))

      expect(result).toBeInstanceOf(GuestError)
      expect((result as GuestError).message).toEqual(
        GUEST_ERRORS.GUEST_UNKNOWN_ERROR
      )
      expect(commandBus.execute).toHaveBeenCalledTimes(1)
      expect(logger.log).not.toHaveBeenCalled()
    })

    it('должен удалять созданного пользователя, если гость не создался', async () => {
      const mockUser = {
        id: uuid(),
        login: mockDto.login,
        password: mockDto.guestRole,
        name: mockDto.name,
      }

      commandBus.execute.mockImplementation((command: any) => {
        if (command instanceof CreateUserCommand) {
          return Promise.resolve(mockUser)
        }
        if (command instanceof CreateGuestCommand) {
          return Promise.resolve(
            new GuestError(GUEST_ERRORS.GUEST_UNKNOWN_ERROR)
          )
        }
        return Promise.resolve()
      })

      const result = await handler.execute(new RegisterGuestCommand(mockDto))

      expect(result).toBeInstanceOf(GuestError)
      expect((result as GuestError).message).toEqual(
        GUEST_ERRORS.GUEST_UNKNOWN_ERROR
      )

      expect(commandBus.execute).toHaveBeenCalledWith(
        new DeleteUserCommand({ id: mockUser.id })
      )
      expect(logger.log).not.toHaveBeenCalled()
    })
  })
})
