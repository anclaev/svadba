import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserController } from './api/user.controller'
import { UserCommandHandlers } from './app/commands'
import { UserQueryHandlers } from './app/queries'
import { UserRepository } from './infra'

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserRepository, ...UserCommandHandlers, ...UserQueryHandlers],
  exports: [UserRepository, ...UserCommandHandlers, ...UserQueryHandlers],
})
export class UserModule {}
