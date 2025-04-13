import { Command } from '@nestjs/cqrs'

import { SocialLink, SocialLinkError } from '#/social-link/domain'

import { UpdateSocialLinkInput } from './update-social-link.input'

export class UpdateSocialLinkCommand extends Command<
  SocialLink | SocialLinkError
> {
  constructor(
    public id: string,
    public dto: UpdateSocialLinkInput
  ) {
    super()
  }
}
