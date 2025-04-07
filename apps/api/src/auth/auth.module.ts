import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '#/user/user.module'

import { AuthController } from './api/auth.controller'

import { AuthService } from './application/auth.service'
import { JwtStrategy } from './application/strategies/jwt.strategy'
import { LocalStrategy } from './application/strategies/local.strategy'
import { RefreshStrategy } from './application/strategies/refresh.strategy'

@Module({
  imports: [CqrsModule, PassportModule, JwtModule, UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
