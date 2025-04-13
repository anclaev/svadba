import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { DresscodeColorRepository, TimingEventRepository } from './domain'
import {
  DresscodeColorPrismaRepository,
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

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [timingEventRepositoryProvider, dresscodeRepositoryProvider],
})
export class SvadbaModule {}
