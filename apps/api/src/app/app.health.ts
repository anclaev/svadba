import { Injectable } from '@nestjs/common'
import { HealthIndicatorService } from '@nestjs/terminus'

/**
 * Сервис индикатора здоровья приложения
 * @class AppHealthIndicator
 * @Injectable
 * @description Предоставляет функционал для проверки здоровья приложения
 * в рамках системы мониторинга NestJS Terminus.
 *
 * @example
 * // Использование в контроллере
 * @Get('health')
 * @HealthCheck()
 * healthCheck() {
 *   return this.health.check([() => this.appHealthIndicator.isHealthy()]);
 * }
 */
@Injectable()
export class AppHealthIndicator {
  /**
   * Конструктор AppHealthIndicator
   * @constructor
   * @param {HealthIndicatorService} healthIndicatorService - Сервис проверки здоровья Terminus
   */
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService
  ) {}

  /**
   * Проверяет состояние здоровья приложения
   * @method isHealthy
   * @async
   * @returns {Promise<HealthIndicatorResult>} Результат проверки здоровья
   * @description
   * Выполняет проверку здоровья приложения, возвращая объект вида:
   * {
   *   app: {
   *     status: 'up'
   *   }
   * }
   *
   * @throws {Error} В случае если проверка здоровья не удалась
   *
   * @example
   * // Пример возвращаемого значения
   * const health = await appHealthIndicator.isHealthy();
   * // { app: { status: 'up' } }
   */
  async isHealthy() {
    return this.healthIndicatorService.check('app').up()
  }
}
