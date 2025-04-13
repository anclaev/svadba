import { Injectable, UnauthorizedException } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { isNull } from '@repo/shared'
import type { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '#/config/config.service'

import { User, UserError } from '#/user/domain'

import { AuthCookieData, Cookies, IAccessPayload } from '#/auth/app'
import { UserByIdQuery } from '#/user/app'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly config: ConfigService,
    private readonly query: QueryBus
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
        (req: Request) => {
          const token = req.token

          if (!token) {
            return null
          }

          return token
        },
      ]),
      secretOrKey: config.env('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
    })
  }

  async validate(data: IAccessPayload | null): Promise<User> {
    if (isNull(data)) {
      throw new UnauthorizedException('Авторизация не пройдена.')
    }

    const user = await this.query.execute(new UserByIdQuery(data.id))

    if (user instanceof UserError) {
      throw new UnauthorizedException('Авторизация не пройдена.')
    }

    return user
  }
}
