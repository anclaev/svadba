import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import {
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { UpdateSocialLinkCommand } from './update-social-link.command'

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler
  implements
    ICommandHandler<UpdateSocialLinkCommand, SocialLink | SocialLinkError>
{
  constructor(private readonly repository: SocialLinkRepository) {}

  async execute({
    id,
    dto,
  }: UpdateSocialLinkCommand): Promise<SocialLink | SocialLinkError> {
    const existSocialLink = await this.repository.findById(id)

    if (existSocialLink instanceof SocialLinkError) {
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

    return await this.repository.update(existSocialLink)
  }
}
