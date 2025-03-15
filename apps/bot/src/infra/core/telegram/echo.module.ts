import { Module } from '@nestjs/common'

import { EchoUpdate } from './echo.update'

@Module({
  providers: [EchoUpdate],
})
export class EchoModule {}
