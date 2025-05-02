/* eslint-disable @typescript-eslint/unbound-method */
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus'
import { HealthIndicatorSession } from '@nestjs/terminus/dist/health-indicator/health-indicator.service'
import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { AppHealthIndicator } from '../app.health'

describe('AppHealthIndicator', () => {
  let service: AppHealthIndicator
  let healthIndicatorService: DeepMockProxy<HealthIndicatorService>

  beforeEach(async () => {
    // Создаем мок для HealthIndicatorService
    healthIndicatorService = mockDeep<HealthIndicatorService>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppHealthIndicator,
        {
          provide: HealthIndicatorService,
          useValue: healthIndicatorService,
        },
      ],
    }).compile()

    service = module.get<AppHealthIndicator>(AppHealthIndicator)
  })

  it('должен быть определен', () => {
    expect(service).toBeDefined()
  })

  describe('isHealthy()', () => {
    it('должен возвращать статус "up" для индикатора "app"', async () => {
      const expectedResult: HealthIndicatorResult = {
        app: { status: 'up' },
      }

      const checkResult = new HealthIndicatorSession('app')

      healthIndicatorService.check.mockReturnValue(checkResult)

      const result = await service.isHealthy()

      // Assert
      expect(result).toEqual(expectedResult)
      expect(healthIndicatorService.check).toHaveBeenCalledWith('app')
    })
  })
})
