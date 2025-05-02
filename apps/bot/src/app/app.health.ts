import { Injectable } from '@nestjs/common'
import { HealthIndicatorService } from '@nestjs/terminus'

@Injectable()
export class AppHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService
  ) {}

  async isHealthy() {
    return this.healthIndicatorService.check('app').up()
  }
}
