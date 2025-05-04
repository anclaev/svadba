import { Logger } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { CreateUserCommand, DeleteUserCommand } from '#/user/app'
import { USER_ERRORS, UserError } from '#/user/domain'

import { Guest, GUEST_ERRORS, GuestError } from '../../../domain'

import { CreateGuestCommand } from '../create-guest'
import { RegisterGuestCommand } from './register-guest.command'

@CommandHandler(RegisterGuestCommand)
export class RegisterGuestHandler
  implements ICommandHandler<RegisterGuestCommand, Guest | GuestError>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}

  async execute({ dto }: RegisterGuestCommand): Promise<Guest | GuestError> {
    const { guestRole: role, side, answers, ...user } = dto

    const createdUser = await this.commandBus.execute(
      new CreateUserCommand(user)
    )

    if (createdUser instanceof UserError) {
      switch (createdUser.message) {
        case USER_ERRORS.USER_ALREADY_EXISTS: {
          return new GuestError(GUEST_ERRORS.GUEST_ALREADY_EXISTS)
        }
        default: {
          return new GuestError(GUEST_ERRORS.GUEST_UNKNOWN_ERROR)
        }
      }
    }

    const guest = await this.commandBus.execute(
      new CreateGuestCommand({
        side,
        role,
        userId: createdUser.id,
        answers,
      })
    )

    if (guest instanceof GuestError) {
      await this.commandBus.execute(
        new DeleteUserCommand({ id: createdUser.id })
      )
    } else {
      this.logger.log(`Гость '${user.name}' зарегистрирован!`, 'Svadba')
    }

    return guest
  }
}
