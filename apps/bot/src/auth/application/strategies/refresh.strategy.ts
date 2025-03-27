import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { ConfigService } from '#/config/config.service'

import { AuthService } from '../auth.service'

import { isNull } from '#/common/utils'

import type { IRefreshPayload } from '#/auth/infra/interfaces'
import { Cookies, type RefreshCookieData } from '#/auth/infra/types'
import type { User } from '#/users/domain/user'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    readonly config: ConfigService,
    private readonly auth: AuthService
  ) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: config.env('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const data = req.signedCookies[
            Cookies.REFRESH_COOKIE
          ] as RefreshCookieData
          if (!data) {
            return null
          }

          return data.refresh_token
        },
        (req: Request) => {
          const token = req.token

          if (!token) {
            return null
          }

          return token
        },
      ]),
    })
  }

  async validate(req: Request, payload?: IRefreshPayload): Promise<User> {
    if (!payload) {
      throw new UnauthorizedException('Некорректный токен обновления.')
    }

    const data = req.signedCookies[Cookies.REFRESH_COOKIE] as RefreshCookieData

    const token: string | null = data
      ? data.refresh_token
        ? data.refresh_token
        : null
      : req.token || null

    if (!token) {
      throw new UnauthorizedException('Некорректный токен обновления.')
    }

    const user = await this.auth.verifyRefreshToken(token, payload)

    if (isNull(user)) {
      throw new UnauthorizedException('Токен обновления просрочен.')
    }

    return user
  }
}
