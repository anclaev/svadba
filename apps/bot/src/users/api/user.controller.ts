import { Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { User } from '#/users/domain/user'

import { CreateUserCommand } from '../application/commands/create-user.command'

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async createUser(): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand())
  }
}
