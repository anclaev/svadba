import { Module } from "@nestjs/common"
import { CqrsModule } from "@nestjs/cqrs"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { UsersModule } from "#/users/users.module"

import { AuthController } from "./api/auth.controller"

import { AuthService } from "./application/auth.service"
import { JwtStrategy } from "./application/strategies/jwt.strategy"
import { LocalStrategy } from "./application/strategies/local.strategy"
import { RefreshStrategy } from "./application/strategies/refresh.strategy"

@Module({
  imports: [CqrsModule, PassportModule, JwtModule, UsersModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
