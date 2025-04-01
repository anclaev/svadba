import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { SocialLinkError, SocialLinkRepository } from '#/social-link/infra'

import { DeleteSocialLinkCommand } from './delete-social-link.command'

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkCommandHandler
  implements ICommandHandler<DeleteSocialLinkCommand>
{
  constructor(private readonly repo: SocialLinkRepository) {}

  async execute({
    socialLinkId,
  }: DeleteSocialLinkCommand): Promise<boolean | SocialLinkError> {
    return await this.repo.delete(socialLinkId)
  }
}
