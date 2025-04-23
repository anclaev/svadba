import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus'

import { AppHealthIndicator } from './app.health'

/**
 * Базовый контроллер приложения
 * @class AppController
 * @description Основной контроллер приложения, содержащий общие endpoint'ы:
 * - Проверка здоровья (health check)
 *
 * @ApiTags('Приложение') - Группирует endpoints в Swagger документации
 * @Controller() - Базовый путь для маршрутов контроллера
 */
@ApiTags('Приложение')
@Controller()
export class AppController {
  /**
   * Конструктор AppController
   * @constructor
   * @param {HealthCheckService} health - Сервис проверки здоровья
   * @param {AppHealthIndicator} indicator - Индикатор здоровья приложения
   */
  constructor(
    private health: HealthCheckService,
    private indicator: AppHealthIndicator
  ) {}

  /**
   * Endpoint проверки здоровья приложения
   * @GET health
   * @HttpCode 200 - Всегда возвращает статус 200 при успешном запросе
   * @HealthCheck() - Активирует систему health checks
   * @returns {HealthCheckResult} Результат проверки здоровья
   *
   * @description
   * Проверяет состояние здоровья приложения:
   * 1. Вызывает индикатор здоровья AppHealthIndicator
   * 2. Возвращает результат в стандартизированном формате
   *
   * @example
   * // Пример ответа
   * {
   *   status: 'ok',
   *   info: { 'app-health': { status: 'up' } },
   *   error: {},
   *   details: { 'app-health': { status: 'up' } }
   * }
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([() => this.indicator.isHealthy()])
  }
}
