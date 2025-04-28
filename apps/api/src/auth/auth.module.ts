import { Logger, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { SvadbaModule } from '#/svadba/svadba.module'
import { UserModule } from '#/user/user.module'

import { AuthController, RegistrationLinkController } from './api'

import {
  AuthService,
  JwtStrategy,
  LocalStrategy,
  RefreshStrategy,
  registrationLinkCommandHandlers,
  registrationLinkQueryHandlers,
  RegistrationLinkService,
} from './app'

import { RegistrationLinkRepository } from './domain'

import { RegistrationLinkPrismaRepository } from './infra'

export const registrationLinkRepositoryProvider = {
  provide: RegistrationLinkRepository,
  useClass: RegistrationLinkPrismaRepository,
}

@Module({
  imports: [CqrsModule, PassportModule, JwtModule, UserModule, SvadbaModule],
  controllers: [AuthController, RegistrationLinkController],
  providers: [
    Logger,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    registrationLinkRepositoryProvider,
    ...registrationLinkQueryHandlers,
    ...registrationLinkCommandHandlers,
    RegistrationLinkService,
  ],
})
export class AuthModule {}
