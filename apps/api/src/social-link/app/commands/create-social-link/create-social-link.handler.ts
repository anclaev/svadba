import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

import {
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { CreateSocialLinkCommand } from './create-social-link.command'

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler
  implements ICommandHandler<CreateSocialLinkCommand>
{
  constructor(private readonly repository: SocialLinkRepository) {}

  async execute({
    dto,
  }: CreateSocialLinkCommand): Promise<SocialLink | SocialLinkError> {
    if (await this.repository.exists(dto.alias.trim())) {
      return new SocialLinkError('SOCIAL_LINK_ALREADY_EXISTS')
    }

    const id = v4()

    const socialLink = SocialLink.create({
      id,
      alias: dto.alias,
      title: dto.title,
      href: dto.href,
      icon: dto.icon || null,
      creatorId: dto.creatorId,
    })

    const createdSocialLink = await this.repository.create(socialLink)

    if (createdSocialLink instanceof SocialLink) {
      createdSocialLink.commit()
    }

    return createdSocialLink
  }
}
