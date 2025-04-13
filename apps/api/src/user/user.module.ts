import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserController } from './api'
import { userCommandHandlers, userQueryHandlers } from './app'
import { UserRepository } from './domain'
import { UserPrismaRepository } from './infra'

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: UserPrismaRepository,
}

@Module({
  imports: [CqrsModule],
  providers: [
    userRepositoryProvider,
    ...userCommandHandlers,
    ...userQueryHandlers,
  ],
  controllers: [UserController],
  exports: [...userCommandHandlers, ...userQueryHandlers],
})
export class UserModule {}
