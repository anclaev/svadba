import {
  INestApplication,
  Injectable,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common'

import { PrismaClient } from '#prisma'

import { loggerFactory } from '#infra/core/logger'

/**
 * Сервис подключения к базе данных
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: LoggerService

  constructor() {
    super()
    this.logger = loggerFactory({ label: 'Prisma' })
  }

  // istanbul ignore next
  async onModuleInit(): Promise<void> {
    // istanbul ignore next
    await this.$connect()
      // istanbul ignore next
      .catch(() => {
        // istanbul ignore next
        this.logger.error('Ошибка подключения к базе данных!', {
          label: 'Prisma',
        })
        // istanbul ignore next
        process.exit(1)
      })
      // istanbul ignore next
      .then(() => {
        // istanbul ignore next
        this.logger.log({
          message: 'Подключение к базе данных установлено!',
          level: 'info',
        })
      })

    // istanbul ignore next
    process.on('error', () => {
      return
    })

    // istanbul ignore next
    process.on('warn', () => {
      return
    })

    // istanbul ignore next
    process.on('info', () => {
      return
    })

    // istanbul ignore next
    process.on('query', () => {
      return
    })
  }

  // istanbul ignore next
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
