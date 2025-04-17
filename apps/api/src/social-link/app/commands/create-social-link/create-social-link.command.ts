import { Command } from '@nestjs/cqrs'

import { SocialLink, SocialLinkError } from '#/social-link/domain'

import { CreateSocialLinkInput } from './create-social-link.input'

export class CreateSocialLinkCommand extends Command<
  SocialLink | SocialLinkError
> {
  constructor(public dto: CreateSocialLinkInput) {
    super()
  }
}
