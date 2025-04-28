import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { isUndefined } from '@repo/shared'

import {
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { UpdateRegistrationLinkCommand } from './update-registration-link.command'

@CommandHandler(UpdateRegistrationLinkCommand)
export class UpdateRegistrationLinkHandler
  implements
    ICommandHandler<
      UpdateRegistrationLinkCommand,
      RegistrationLink | RegistrationLinkError
    >
{
  constructor(private repository: RegistrationLinkRepository) {}

  async execute({
    id,
    dto,
  }: UpdateRegistrationLinkCommand): Promise<
    RegistrationLink | RegistrationLinkError
  > {
    const { expiresAt, isActive, meta } = dto

    const registrationLink = await this.repository.findById(id)

    if (registrationLink instanceof RegistrationLinkError) {
      return registrationLink
    }

    // Проверка на занятость логина
    if (meta && meta.login) {
      const loginIsExist = await this.repository.findMore(
        { page: 1, size: 1000 },
        { meta: { login: meta.login.trim() } }
      )

      if (
        !(loginIsExist instanceof RegistrationLinkError) &&
        loginIsExist.data.length > 0
      ) {
        return new RegistrationLinkError('REGISTRATION_LINK_META_LOGIN_EXISTS')
      }
    }

    if (expiresAt) {
      registrationLink.expiresAt = expiresAt
    }

    if (!isUndefined(isActive)) {
      registrationLink.isActive = isActive!
    }

    if (meta) {
      registrationLink.setMeta({
        ...(registrationLink.meta as object),
        ...meta,
      })
    }

    return await this.repository.update(registrationLink)
  }
}
