import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs'
import { ConfigService } from '@repo/shared'
import { v4 as uuid } from 'uuid'

import { Config } from '#/common/config.schema'
import { addSeconds } from '#/common/utils'

import { UserByLoginQuery } from '#/user/app'
import { UserError } from '#/user/domain'

import {
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { CreateRegistrationLinkCommand } from './create-registration-link.command'

@CommandHandler(CreateRegistrationLinkCommand)
export class CreateRegistrationLinkHandler
  implements
    ICommandHandler<
      CreateRegistrationLinkCommand,
      RegistrationLink | RegistrationLinkError
    >
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly repository: RegistrationLinkRepository,
    private readonly config: ConfigService<Config>
  ) {}

  async execute({
    dto,
  }: CreateRegistrationLinkCommand): Promise<
    RegistrationLink | RegistrationLinkError
  > {
    const { meta, isActive, ownerId } = dto

    if (meta.login) {
      // Проверка занятости логина у существующих пользователей
      const userAlreadyExists = await this.queryBus.execute(
        new UserByLoginQuery(meta.login.trim())
      )

      if (!(userAlreadyExists instanceof UserError)) {
        return new RegistrationLinkError('REGISTRATION_LINK_META_LOGIN_EXISTS')
      }

      // Проверка на наличие логина в уже существующих ссылках
      const loginAlreadyExists = await this.repository.findMore(
        {
          page: 1,
          size: 1000,
        },
        {
          meta: {
            login: meta.login.trim(),
          },
        }
      )

      if (
        !(loginAlreadyExists instanceof RegistrationLinkError) &&
        loginAlreadyExists.data.length > 0
      )
        return new RegistrationLinkError('REGISTRATION_LINK_META_LOGIN_EXISTS')
    }

    const newRegistrationLink = new RegistrationLink({
      id: uuid(),
      isActive,
      ownerId,
      status: 'PENDING',
      meta,
      expiresAt: addSeconds(
        new Date(),
        dto.expiration ||
          Number(this.config.env('REGISTRATION_LINK_EXPIRATION'))
      ),
    })

    return this.repository.create(newRegistrationLink)
  }
}
