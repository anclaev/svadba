import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { guestCommandHandlers } from './app'

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
  imports: [CqrsModule],
  controllers: [],
  providers: [
    timingEventRepositoryProvider,
    dresscodeRepositoryProvider,
    guestRepositoryProvider,
    ...guestCommandHandlers,
  ],
})
export class SvadbaModule {}
