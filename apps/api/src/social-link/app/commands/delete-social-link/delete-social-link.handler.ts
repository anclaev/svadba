import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { SocialLinkError, SocialLinkRepository } from '#/social-link/domain'

import { DeleteSocialLinkCommand } from './delete-social-link.command'

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler
  implements ICommandHandler<DeleteSocialLinkCommand>
{
  constructor(private readonly repository: SocialLinkRepository) {}

  async execute({
    dto,
  }: DeleteSocialLinkCommand): Promise<boolean | SocialLinkError> {
    return await this.repository.delete(dto.id)
  }
}
