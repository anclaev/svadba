import { Command } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkError } from '#/social-link/infra'

import { CreateSocialLinkDto } from './create-social-link.dto'

export class CreateSocialLinkCommand extends Command<
  SocialLink | SocialLinkError
> {
  constructor(public dto: CreateSocialLinkDto) {
    super()
  }
}
