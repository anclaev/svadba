import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { User, UserError, UserRepository } from '#/user/domain'

import { UpdateUserCommand } from './update-user.command'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, User | UserError>
{
  constructor(private readonly repository: UserRepository) {}

  async execute({ id, dto }: UpdateUserCommand): Promise<User | UserError> {
    const existUser = await this.repository.findById(id)

    if (existUser instanceof UserError) {
      return new UserError('USER_NOT_FOUND')
    }

    if (dto.login) {
      const existUserByLogin = await this.repository.findByLogin(dto.login)

      if (existUserByLogin instanceof User) {
        return new UserError('USER_LOGIN_ALREADY_EXISTS')
      }

      existUser.login = dto.login.trim()
    }

    if (dto.name) {
      existUser.name = dto.name.trim()
    }

    if (dto.password) {
      await existUser.updatePassword(dto.password.trim())
    }

    if (dto.role) {
      existUser.role = dto.role
    }

    if (dto.status) {
      existUser.status = dto.status
    }

    if (dto.telegramId) {
      const existUserByTelegramId = await this.repository.findByTelegramId(
        dto.telegramId
      )

      if (existUserByTelegramId instanceof User) {
        return new UserError('USER_TELEGRAM_ID_ALREADY_EXISTS')
      }

      existUser.telegramId = dto.telegramId
    }

    if (dto.guestId) {
      const existUserByGuestId = await this.repository.findByGuestId(
        dto.guestId
      )

      if (existUserByGuestId instanceof User) {
        return new UserError('USER_GUEST_ID_ALREADY_EXISTS')
      }

      existUser.guestId = dto.guestId
    }

    existUser.commit()

    return await this.repository.update(existUser)
  }
}
