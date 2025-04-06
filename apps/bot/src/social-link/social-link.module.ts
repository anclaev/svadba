import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { SocialLinkController } from './api/social-link.controller'
import { SocialLinkCommandHandlers } from './app/commands'
import { SocialLinkQueryHandlers } from './app/queries'
import { SocialLinkRepository } from './infra'

@Module({
  imports: [CqrsModule],
  controllers: [SocialLinkController],
  providers: [
    SocialLinkRepository,
    ...SocialLinkCommandHandlers,
    ...SocialLinkQueryHandlers,
  ],
  exports: [
    SocialLinkRepository,
    ...SocialLinkCommandHandlers,
    ...SocialLinkQueryHandlers,
  ],
})
export class SocialLinkModule {}
