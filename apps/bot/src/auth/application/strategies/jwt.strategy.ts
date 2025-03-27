import { Injectable, UnauthorizedException } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs"
import { PassportStrategy } from "@nestjs/passport"
import type { Request } from "express"
import { ExtractJwt, Strategy } from "passport-jwt"

import { isNull } from "#/common/utils"

import { ConfigService } from "#/config/config.service"

import { GetUserQuery } from "#/users/application/queries/get-user.query"
import type { User } from "#/users/domain/user"

import type { IAccessPayload } from "#/auth/infra/interfaces"
import { type AuthCookieData, Cookies } from "#/auth/infra/types"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    readonly config: ConfigService,
    private readonly query: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const data = req.signedCookies[Cookies.AUTH_COOKIE] as AuthCookieData

          if (!data) {
            return null
          }

          return data.access_token
        },
      ]),
      secretOrKey: config.env("JWT_ACCESS_SECRET"),
      ignoreExpiration: false,
    })
  }

  async validate(data: IAccessPayload | null): Promise<User> {
    if (isNull(data)) {
      throw new UnauthorizedException("Авторизация не пройдена.")
    }

    const user = await this.query.execute(new GetUserQuery(data.id))

    if (isNull(user)) {
      throw new UnauthorizedException("Авторизация не пройдена.")
    }

    return user
  }
}
