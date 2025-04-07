import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { social_link } from '@repo/shared'
import { join } from 'path'

import { SocialLinkGrpcController } from './api/social-link-grpc.controller'
import { SocialLinkController } from './api/social-link.controller'
import { SocialLinkCommandHandlers } from './app/commands'
import { SocialLinkQueryHandlers } from './app/queries'
import { SocialLinkRepository } from './infra'

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: social_link.PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: social_link.PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/social-link.proto'),
          loader: {
            includeDirs: [join(__dirname, '../proto')],
          },
        },
      },
    ]),
  ],
  controllers: [SocialLinkController, SocialLinkGrpcController],
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
