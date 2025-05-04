import { GuestRole } from '#prisma'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

import { Guest, GuestError, GuestRepository } from '../../../domain'

import { CreateGuestCommand } from './create-guest.command'

@CommandHandler(CreateGuestCommand)
export class CreateGuestHandler
  implements ICommandHandler<CreateGuestCommand, Guest | GuestError>
{
  constructor(private readonly repository: GuestRepository) {}

  async execute(command: CreateGuestCommand): Promise<Guest | GuestError> {
    const { userId, side, answers, role } = command.dto
    if (await this.repository.exists(command.dto.userId)) {
      return new GuestError('GUEST_ALREADY_EXISTS')
    }

    const id = v4()

    const guest = Guest.create({
      id,
      userId,
      side,
      role: role || GuestRole.GUEST,
      answers: answers || {},
    })

    const createdGuest = await this.repository.create(guest)

    if (createdGuest instanceof Guest) {
      createdGuest.commit()
    }

    return createdGuest
  }
}
