import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '#/user/user.module'

import { AuthController } from '#/auth/api'

import {
  AuthService,
  JwtStrategy,
  LocalStrategy,
  RefreshStrategy,
} from '#/auth/app'

@Module({
  imports: [CqrsModule, PassportModule, JwtModule, UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
