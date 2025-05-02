import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'

/**
 * Сервис для работы с Redis
 * @class RedisService
 * @implements {OnModuleInit}
 * @description Предоставляет методы для кеширования данных в Redis
 * с автоматической проверкой подключения при инициализации модуля.
 *
 * @example
 * // Использование в другом сервисе
 * @Injectable()
 * export class SomeService {
 *   constructor(private readonly redis: RedisService) {}
 *
 *   async getData() {
 *     const cached = await this.redis.get('data-key');
 *     if (!cached) {
 *       // Получаем данные из источника
 *       await this.redis.set('data-key', data, 60); // TTL 60 сек
 *     }
 *     return cached;
 *   }
 * }
 */
@Injectable()
export class RedisService implements OnModuleInit {
  /**
   * Конструктор RedisService
   * @constructor
   * @param {Cache} cache - Инжектированный менеджер кеша (из @nestjs/cache-manager)
   * @param {Logger} logger - Логгер для записи событий
   */
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly logger: Logger
  ) {}

  /**
   * Хук инициализации модуля
   * @async
   * @method onModuleInit
   * @description Проверяет подключение к Redis при старте приложения:
   * 1. Пытается записать тестовое значение
   * 2. При успехе - логирует подключение
   * 3. При ошибке - завершает процесс с кодом 1
   *
   * @throws {Error} Завершает процесс при ошибке подключения
   */
  async onModuleInit() {
    try {
      // Тестовая запись для проверки подключения
      await this.cache.set('init', 'init', 100)

      this.logger.log(
        'Подключение к серверу Redis установлено!',
        'RedisService'
      )

      await this.cache.del('init')
    } catch {
      this.logger.error('Ошибка подключения к серверу Redis', 'RedisService')
      process.exit(1)
    }
  }

  /**
   * Получить данные по ключу
   * @async
   * @method get
   * @template T - Ожидаемый тип данных
   * @param {string} key - Ключ для получения данных
   * @returns {Promise<T | null>} Данные или null если ключ не найден
   */
  async get<T>(key: string): Promise<T | null> {
    return await this.cache.get<T>(key)
  }

  /**
   * Записать данные в кеш
   * @async
   * @method set
   * @template T - Тип сохраняемых данных
   * @param {string} key - Ключ для сохранения
   * @param {any} value - Значение для кеширования
   * @param {number} [ttl] - Время жизни в секундах (опционально)
   * @returns {Promise<T>} Сохраненные данные
   */
  async set<T>(key: string, value: any, ttl?: number): Promise<T> {
    return await this.cache.set<T>(key, value, ttl)
  }

  /**
   * Удалить данные по ключу
   * @async
   * @method del
   * @param {string} key - Ключ для удаления
   * @returns {Promise<boolean>} true если удаление успешно
   */
  async del(key: string): Promise<boolean> {
    return await this.cache.del(key)
  }
}
