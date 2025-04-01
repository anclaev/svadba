import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkError, SocialLinkRepository } from '#/social-link/infra'

import { UpdateSocialLinkCommand } from './update-social-link.command'

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkCommandHandler
  implements ICommandHandler<UpdateSocialLinkCommand>
{
  constructor(private readonly repo: SocialLinkRepository) {}

  async execute({
    socialLinkId,
    dto,
  }: UpdateSocialLinkCommand): Promise<SocialLink | SocialLinkError> {
    const existSocialLink = await this.repo.findById(socialLinkId)

    if (!existSocialLink) {
      return new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
    }

    if (dto.title) {
      existSocialLink.title = dto.title
    }

    if (dto.href) {
      existSocialLink.href = dto.href
    }

    if (dto.icon) {
      existSocialLink.icon = dto.icon
    }

    existSocialLink.commit()

    return await this.repo.put(existSocialLink)
  }
}
