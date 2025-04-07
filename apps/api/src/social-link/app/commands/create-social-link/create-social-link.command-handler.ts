import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkError, SocialLinkRepository } from '#/social-link/infra'

import { CreateSocialLinkCommand } from './create-social-link.command'

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkCommandHandler
  implements ICommandHandler<CreateSocialLinkCommand>
{
  constructor(private readonly repo: SocialLinkRepository) {}

  async execute({
    dto,
  }: CreateSocialLinkCommand): Promise<SocialLink | SocialLinkError> {
    const { alias } = dto

    if (await this.repo.exists(dto.alias.trim())) {
      return new SocialLinkError('SOCIAL_LINK_ALREADY_EXISTS')
    }

    const socialLink = SocialLink.create({
      ...dto,
      alias,
      icon: dto.icon ?? null,
      creatorId: dto.creatorId!,
    })

    return await this.repo.create(socialLink)
  }
}
