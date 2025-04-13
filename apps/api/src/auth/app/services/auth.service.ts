import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt'
import { isNull } from '@repo/shared'
import * as argon2 from 'argon2'
import { v4 as uuid } from 'uuid'

import { REDIS_KEY } from '#/common/constants'
import { ConfigService } from '#/config/config.service'
import { RedisService } from '#/core/redis.service'

import { CreateUserCommand, UserByIdQuery, UserByLoginQuery } from '#/user/app'
import { User, UserError } from '#/user/domain'

import { SignUpDto } from '#/auth/api'

import {
  IAccessPayload,
  IConfirmationPayload,
  IRefreshPayload,
  LoginResult,
  Tokens,
} from '#/auth/app'
import { GuestRole, Side } from '#prisma'

@Injectable()
export class AuthService {
  private readonly issuer

  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private jwt: JwtService,
    private config: ConfigService,
    private redis: RedisService
  ) {
    this.issuer = this.config.env('HOST')
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.queryBus.execute(new UserByLoginQuery(login))

    if (
      user instanceof User &&
      (await argon2.verify(user.password, password))
    ) {
      return user
    }

    return null
  }

  async signUp(data: SignUpDto): Promise<LoginResult | UserError> {
    const user = await this.queryBus.execute(new UserByLoginQuery(data.login))

    if (user instanceof User) {
      return new UserError('USER_ALREADY_EXISTS')
    }

    const registeredUser = await this.commandBus.execute(
      new CreateUserCommand({
        login: data.login,
        name: data.name,
        password: data.password,
        side: data.side as Side,
        guestRole: data.role as GuestRole,
        guestAnswers: data.answers,
      })
    )

    if (registeredUser instanceof UserError) return registeredUser

    return this.login(registeredUser)
  }

  async login(user: User): Promise<LoginResult> {
    const refresh_token_id = uuid()

    const access_token = await this.generateToken(user, Tokens.ACCESS)
    const refresh_token = await this.generateToken(
      user,
      Tokens.REFRESH,
      refresh_token_id
    )

    return { user, access_token, refresh_token, refresh_token_id }
  }

  async generateToken(
    user: User,
    tokenType: Tokens,
    tokenId?: string
  ): Promise<string> {
    const options: JwtSignOptions = {
      issuer: this.issuer,
      subject: user.login,
      algorithm: 'HS256',
    }

    switch (tokenType) {
      case Tokens.ACCESS: {
        const payload: IAccessPayload = {
          id: user.id,
          role: user.guest.role,
          status: user.status,
        }

        return await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_ACCESS_TIME')}s`,
          secret: this.config.env('JWT_ACCESS_SECRET'),
        })
      }

      case Tokens.REFRESH: {
        const payload: IRefreshPayload = {
          id: user.id,
          tokenId: tokenId ?? uuid(),
          version: user.credentialsVersion,
          role: user.guest.role,
          status: user.status,
        }

        const token = await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_REFRESH_TIME')}s`,
          secret: this.config.env('JWT_REFRESH_SECRET'),
        })

        const hashedToken = await argon2.hash(token)

        await this.redis.set<string>(
          `${REDIS_KEY.REFRESH_TOKEN}:${user.id}:${tokenId}`,
          hashedToken,
          this.config.env('JWT_REFRESH_TIME') * 1000
        )

        return token
      }
      case Tokens.CONFIRMATION: {
        const payload: IConfirmationPayload = {
          id: user.id,
          version: user.credentialsVersion,
          role: user.guest.role,
          status: user.status,
        }

        return await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_CONFIRMATION_TIME')}s`,
          secret: this.config.env('JWT_CONFIRMATION_SECRET'),
        })
      }
      case Tokens.RESET: {
        const payload: IConfirmationPayload = {
          id: user.id,
          version: user.credentialsVersion,
          role: user.guest.role,
          status: user.status,
        }

        return await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_RESET_PASSWORD_TIME')}s`,
          secret: this.config.env('JWT_RESET_PASSWORD_SECRET'),
        })
      }
    }
  }

  async verifyToken<T extends object>(
    token: string,
    secret: string,
    options: JwtVerifyOptions
  ): Promise<T> {
    return await this.jwt.verifyAsync<T>(token, { ...options, secret })
  }

  async verifyRefreshToken(
    token: string,
    payload: IRefreshPayload
  ): Promise<User | null> {
    const { id: userId, tokenId } = payload

    const user = await this.queryBus.execute(new UserByIdQuery(userId))

    if (user instanceof UserError) return null

    const savedRefreshToken = await this.redis.get<string>(
      `${REDIS_KEY.REFRESH_TOKEN}:${user.id}:${tokenId}`
    )

    if (isNull(savedRefreshToken)) return null

    const isVerifiedToken = await argon2.verify(savedRefreshToken, token)

    if (!isVerifiedToken) return null

    return user
  }

  async removeRefreshToken(userId: string, tokenId: string): Promise<boolean> {
    return await this.redis.del(
      `${REDIS_KEY.REFRESH_TOKEN}:${userId}:${tokenId}`
    )
  }
}
