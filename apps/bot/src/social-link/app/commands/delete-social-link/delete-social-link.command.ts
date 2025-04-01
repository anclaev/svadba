import { Command } from '@nestjs/cqrs'

import { SocialLinkError } from '#/social-link/infra'

export class DeleteSocialLinkCommand extends Command<
  boolean | SocialLinkError
> {
  constructor(public socialLinkId: string) {
    super()
  }
}
