import { Logger, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserModule } from '#/user/user.module'

import { GuestController } from './api'

import { guestCommandHandlers, guestQueryHandlers } from './app'

import {
  DresscodeColorRepository,
  GuestRepository,
  TimingEventRepository,
} from './domain'

import {
  DresscodeColorPrismaRepository,
  GuestPrismaRepository,
  TimingEventPrismaRepository,
} from './infra'

const timingEventRepositoryProvider = {
  provide: TimingEventRepository,
  useClass: TimingEventPrismaRepository,
}

const dresscodeRepositoryProvider = {
  provide: DresscodeColorRepository,
  useClass: DresscodeColorPrismaRepository,
}

const guestRepositoryProvider = {
  provide: GuestRepository,
  useClass: GuestPrismaRepository,
}

@Module({
  imports: [CqrsModule, UserModule],
  controllers: [GuestController],
  providers: [
    Logger,
    timingEventRepositoryProvider,
    dresscodeRepositoryProvider,
    guestRepositoryProvider,
    ...guestCommandHandlers,
    ...guestQueryHandlers,
  ],
})
export class SvadbaModule {}
