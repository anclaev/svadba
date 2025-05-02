import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common'

import { PrismaClient } from '#prisma'

/**
 * Сервис для работы с Prisma ORM
 * @class PrismaService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 * @description Обеспечивает подключение к базе данных через Prisma Client
 * и управление жизненным циклом соединения. Автоматически проверяет подключение
 * при инициализации модуля.
 *
 * @example
 * // Использование в другом сервисе
 * @Injectable()
 * export class UserService {
 *   constructor(private readonly prisma: PrismaService) {}
 *
 *   async getUsers() {
 *     return this.prisma.user.findMany();
 *   }
 * }
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Конструктор PrismaService
   * @constructor
   * @param {Logger} logger - Логгер для записи событий подключения
   */
  constructor(private readonly logger: Logger) {
    super()
  }

  /**
   * Хук инициализации модуля
   * @async
   * @method onModuleInit
   * @description Выполняет подключение к базе данных при старте приложения:
   * 1. Пропускает подключение в тестовом окружении (NODE_ENV=test)
   * 2. Устанавливает соединение с базой данных
   * 3. Логирует результат подключения
   * 4. Завершает процесс при ошибке подключения
   *
   * @throws {Error} Завершает процесс с кодом 1 при ошибке подключения
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'test') return

    // istanbul ignore next
    await this.$connect()
      // istanbul ignore next
      .catch(() => {
        // istanbul ignore next
        this.logger.error(
          'Ошибка подключения к базе данных!',
          {},
          PrismaService.name
        )
        // istanbul ignore next
        process.exit(1)
      })
      // istanbul ignore next
      .then(() => {
        // istanbul ignore next
        this.logger.log(
          'Подключение к базе данных установлено!',
          PrismaService.name
        )
      })

    // Пустые обработчики событий процесса для избежания утечек памяти
    process.on('error', () => {})
    process.on('warn', () => {})
    process.on('info', () => {})
    process.on('query', () => {})
  }

  /**
   * Регистрирует обработчики graceful shutdown
   * @method enableShutdownHooks
   * @param {INestApplication} app - Экземпляр NestJS приложения
   * @description Настраивает корректное завершение работы:
   * 1. Логирует событие завершения
   * 2. Закрывает соединение с базой данных
   * 3. Корректно завершает работу приложения
   */
  enableShutdownHooks(app: INestApplication): void {
    // istanbul ignore next
    process.on('beforeExit', async (event) => {
      // istanbul ignore next
      this.logger.error(event)
      // istanbul ignore next
      await app.close()
    })
  }
}
