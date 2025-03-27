import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs"

import { CreateUserDto } from "./dtos/create-user.dto"

import { User } from "../domain/user"

import { CreateUserCommand } from "../application/commands/create-user.command"
import { Auth } from "#/auth/application/decorators/auth.decorator"

@Controller("users")
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Auth(["ADMIN"])
  @Post("create")
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const result = await this.commandBus.execute(new CreateUserCommand(dto))

    if (!(result instanceof User)) {
      switch (result) {
        case "USER_ALREADY_EXISTS": {
          throw new ConflictException("Пользователь уже создан.")
        }
        default: {
          throw new BadRequestException(result)
        }
      }
    }

    return result
  }
}
