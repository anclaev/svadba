import { Injectable } from '@nestjs/common'
import { ConfigService as RootConfigService } from '@nestjs/config'

import { Config } from './config.schema'

/**
 * Кастомный сервис конфигурации, расширяющий стандартный ConfigService из @nestjs/config
 * @class ConfigService
 * @extends {RootConfigService<Config, true>}
 *
 * @description
 * Предоставляет типизированный доступ к переменным окружения и конфигурации приложения.
 * Наследует функциональность стандартного ConfigService из @nestjs/config,
 * добавляя строгую типизацию через generic-параметр Config.
 *
 * @example
 * // Пример использования в сервисе
 * @Injectable()
 * class SomeService {
 *   constructor(private readonly config: ConfigService) {}
 *
 *   getDatabaseConfig() {
 *     return {
 *       host: this.config.env('DB_HOST'),
 *       port: this.config.env('DB_PORT')
 *     }
 *   }
 * }
 *
 * @see {@link RootConfigService} - базовый сервис
 */
@Injectable()
export class ConfigService extends RootConfigService<Config, true> {
  /**
   * Конструктор ConfigService
   * @constructor
   * @description
   * Вызывает конструктор родительского класса RootConfigService.
   */
  constructor() {
    super()
  }

  /**
   * Получает значение конфигурации по ключу с автоматическим выводом типа
   * @template T - Ключ из типа Config
   * @param {T} key - Ключ параметра конфигурации
   * @returns {Config[T]} Значение параметра конфигурации с автоматическим выводом типа
   *
   * @throws {Error} Если параметр не найден в конфигурации
   *
   * @example
   * // Получение строкового параметра
   * const apiUrl = configService.env('API_URL');
   *
   * @example
   * // Получение числового параметра
   * const port = configService.env('SERVER_PORT');
   *
   * @description
   * Метод использует механизм вывода типов TypeScript на основе ключа.
   * Возвращаемый тип соответствует типу, указанному в интерфейсе Config.
   * Опция { infer: true } обеспечивает правильный вывод типов из родительского класса.
   */
  env<T extends keyof Config>(key: T): Config[T] {
    return this.get(key, { infer: true }) as Config[T]
  }
}
