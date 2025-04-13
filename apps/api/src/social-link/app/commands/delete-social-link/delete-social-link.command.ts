import { Command } from '@nestjs/cqrs'

import { SocialLinkError } from '#/social-link/domain'

import { DeleteSocialLinkInput } from './delete-social-link.input'

export class DeleteSocialLinkCommand extends Command<
  boolean | SocialLinkError
> {
  constructor(public dto: DeleteSocialLinkInput) {
    super()
  }
}
