import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { social_link } from '@repo/shared'
import { join } from 'path'

import { SocialLinkController, SocialLinkGRPCController } from './api'
import { socialLinkCommandHandlers, socialLinkQueryHandlers } from './app'
import { SocialLinkRepository } from './domain'
import { SocialLinkPrismaRepository } from './infra'

export const socialLinkRepositoryProvider = {
  provide: SocialLinkRepository,
  useClass: SocialLinkPrismaRepository,
}

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
  controllers: [SocialLinkController, SocialLinkGRPCController],
  providers: [
    socialLinkRepositoryProvider,
    ...socialLinkCommandHandlers,
    ...socialLinkQueryHandlers,
  ],
  exports: [...socialLinkCommandHandlers, ...socialLinkQueryHandlers],
})
export class SocialLinkModule {}
