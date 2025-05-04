import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import {
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { DeleteSocialLinkCommand } from './delete-social-link.command'

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler
  implements
    ICommandHandler<DeleteSocialLinkCommand, SocialLink | SocialLinkError>
{
  constructor(private readonly repository: SocialLinkRepository) {}

  async execute({
    dto,
  }: DeleteSocialLinkCommand): Promise<boolean | SocialLinkError> {
    const res = await this.repository.delete(dto.id)

    return res ? res : new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
  }
}
