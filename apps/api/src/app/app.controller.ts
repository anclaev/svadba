import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'

import { AppHealthIndicator } from '#/app/app.health'

@ApiTags('Приложение')
@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private indicator: AppHealthIndicator
  ) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.indicator.isHealthy()])
  }
}
