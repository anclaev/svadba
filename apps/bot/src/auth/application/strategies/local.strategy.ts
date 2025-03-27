import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"

import { User } from "#/users/domain/user"

import { AuthService } from "../auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      usernameField: "login",
    })
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.auth.validateUser(login, password)

    if (!user) {
      throw new UnauthorizedException("Авторизация не пройдена.")
    }

    return user
  }
}
