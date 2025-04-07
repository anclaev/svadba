import { Command } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkError } from '#/social-link/infra'

import { UpdateSocialLinkDto } from './update-social-link.dto'

export class UpdateSocialLinkCommand extends Command<
  SocialLink | SocialLinkError
> {
  constructor(
    public socialLinkId: string,
    public dto: UpdateSocialLinkDto
  ) {
    super()
  }
}
