import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"

import { UserController } from "./api/user.controller"
import { UserRepository } from "./domain/user.repository"
import { PrismaUserRepository } from "./infra/prisma-user.repository"

import commandHandlers from "./application/commands"
import queryHandlers from "./application/queries"

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [UserRepository, ...queryHandlers],
})
export class UsersModule {}
