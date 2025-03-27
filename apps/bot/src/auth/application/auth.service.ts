import { GuestRole, Side } from '#prisma'
import { Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { randomUUID } from 'crypto'

import { RedisKey } from '#/common/redis'
import { isNull } from '#/common/utils'

import { ConfigService } from '#/config/config.service'
import { RedisService } from '#/core/redis.service'

import { User } from '#/users/domain/user'
import { UserRepository } from '#/users/domain/user.repository'
import { UserError } from '#/users/infra/errors'

import { SignUpDto } from '../api/dtos/sign-up.dto'

import {
  IAccessPayload,
  IConfirmationPayload,
  IRefreshPayload,
} from '../infra/interfaces'
import { LoginResult, Tokens } from '../infra/types'

@Injectable()
export class AuthService {
  private readonly issuer

  constructor(
    private userRepo: UserRepository,
    private jwt: JwtService,
    private config: ConfigService,
    private redis: RedisService
  ) {
    this.issuer = this.config.env('HOST')
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByLogin(login)

    if (user && (await user.verifyPassword(password))) {
      return user
    }
    return null
  }

  async signUp(data: SignUpDto): Promise<LoginResult | UserError> {
    const newUser = new User({
      login: data.login,
      name: data.name,
      password: await argon2.hash(data.password),
      side: data.side as Side,
      answers: data.anwsers,
      guestRole: data.role as GuestRole,
    })

    const registeredUser = await this.userRepo.create(newUser)

    if (!registeredUser) {
      return UserError.USER_ALREADY_EXISTS
    }

    registeredUser.commit()

    return this.login(registeredUser)
  }

  async login(user: User): Promise<LoginResult> {
    const refresh_token_id = randomUUID()

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
          id: user.getId()!,
        }

        return await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_ACCESS_TIME')}s`,
          secret: this.config.env('JWT_ACCESS_SECRET'),
        })
      }

      case Tokens.REFRESH: {
        const payload: IRefreshPayload = {
          id: user.getId()!,
          tokenId: tokenId ?? randomUUID(),
          version: user.credentialsVersion,
        }

        const token = await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_REFRESH_TIME')}s`,
          secret: this.config.env('JWT_REFRESH_SECRET'),
        })

        const hashedToken = await argon2.hash(token)

        await this.redis.set<string>(
          `${RedisKey.REFRESH_TOKEN}:${user.getId()}:${tokenId}`,
          hashedToken,
          this.config.env('JWT_REFRESH_TIME') * 1000
        )

        return token
      }
      case Tokens.CONFIRMATION: {
        const payload: IConfirmationPayload = {
          id: user.getId()!,
          version: user.credentialsVersion,
        }

        return await this.jwt.signAsync(payload, {
          ...options,
          expiresIn: `${this.config.env('JWT_CONFIRMATION_TIME')}s`,
          secret: this.config.env('JWT_CONFIRMATION_SECRET'),
        })
      }
      case Tokens.RESET: {
        const payload: IConfirmationPayload = {
          id: user.getId()!,
          version: user.credentialsVersion,
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

    const user = await this.userRepo.findById(userId)

    if (isNull(user)) return null

    const savedRefreshToken = await this.redis.get<string>(
      `${RedisKey.REFRESH_TOKEN}:${user.getId()}:${tokenId}`
    )

    if (isNull(savedRefreshToken)) return null

    const isVerifiedToken = await argon2.verify(savedRefreshToken, token)

    if (!isVerifiedToken) return null

    return user
  }

  async removeRefreshToken(userId: number, tokenId: string): Promise<boolean> {
    return await this.redis.del(
      `${RedisKey.REFRESH_TOKEN}:${userId}:${tokenId}`
    )
  }
}
