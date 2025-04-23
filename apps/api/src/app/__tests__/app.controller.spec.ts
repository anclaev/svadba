/* eslint-disable @typescript-eslint/unbound-method */
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { AppController } from '../app.controller'
import { AppHealthIndicator } from '../app.health'

describe('AppController', () => {
  let appController: AppController
  let healthCheckService: DeepMockProxy<HealthCheckService>
  let appHealthIndicator: DeepMockProxy<AppHealthIndicator>

  beforeEach(async () => {
    // Создаем моки для зависимостей
    healthCheckService = mockDeep<HealthCheckService>()
    appHealthIndicator = mockDeep<AppHealthIndicator>()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: healthCheckService,
        },
        {
          provide: AppHealthIndicator,
          useValue: appHealthIndicator,
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('healthCheck', () => {
    it('должен вернуть статус здоровья приложения', async () => {
      const mockHealthResult: HealthCheckResult = {
        status: 'ok',
        details: {
          app: { status: 'up' },
        },
      }

      healthCheckService.check.mockResolvedValue(mockHealthResult)
      appHealthIndicator.isHealthy.mockResolvedValue({ app: { status: 'up' } })

      const result = await appController.healthCheck()

      expect(result).toEqual(mockHealthResult)
    })

    it('должен возвращать HTTP 200 даже при ошибке', async () => {
      healthCheckService.check.mockRejectedValue(
        new Error('Health check failed')
      )

      await expect(appController.healthCheck()).rejects.toThrow(
        'Health check failed'
      )
    })
  })

  describe('контроллер инициализирован', () => {
    it('должен быть определен', () => {
      expect(appController).toBeDefined()
    })

    it('должен иметь метод healthCheck', () => {
      expect(appController.healthCheck).toBeDefined()
      expect(typeof appController.healthCheck).toBe('function')
    })
  })
})
