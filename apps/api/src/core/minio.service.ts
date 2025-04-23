import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@repo/shared'
import * as Minio from 'minio'

import { Config } from '#/common/config.schema'
import { getS3BucketPolicy } from '#/common/utils'

/**
 * Сервис для работы с S3-совместимым хранилищем (MinIO)
 * @class MinioService
 * @extends {Minio.Client}
 * @implements {OnModuleInit}
 * @description Предоставляет методы для взаимодействия с объектным хранилищем MinIO.
 * Автоматически проверяет подключение и создает бакет при инициализации модуля.
 *
 * @example
 * // Использование в другом сервисе
 * @Injectable()
 * export class FileService {
 *   constructor(private readonly minio: MinioService) {}
 *
 *   async uploadFile(file: Express.Multer.File) {
 *     await this.minio.putObject('bucket-name', file.originalname, file.buffer);
 *   }
 * }
 */
@Injectable()
export class MinioService extends Minio.Client implements OnModuleInit {
  /**
   * Название бакета для работы
   * @private
   */
  private readonly bucket: string

  /**
   * Конструктор MinioService
   * @constructor
   * @param {Logger} logger - Логгер для записи событий
   * @param {ConfigService} config - Сервис конфигурации
   *
   * @description Инициализирует клиент MinIO с параметрами из конфигурации:
   * - endpoint (S3_ENDPOINT)
   * - port (S3_PORT)
   * - accessKey (S3_ACCESS_TOKEN)
   * - secretKey (S3_SECRET_TOKEN)
   * - useSSL: false (отключено по умолчанию)
   *
   * @see {@link ConfigService} - сервис конфигурации
   */
  constructor(
    private readonly logger: Logger,
    readonly config: ConfigService<Config>
  ) {
    super({
      endPoint: config.env('S3_ENDPOINT'),
      port: Number(config.env('S3_PORT')),
      accessKey: config.env('S3_ACCESS_TOKEN'),
      secretKey: config.env('S3_SECRET_TOKEN'),
      useSSL: false,
    })
    this.bucket = config.env('S3_BUCKET')
  }

  /**
   * Хук инициализации модуля
   * @async
   * @method onModuleInit
   * @description Выполняет проверку подключения к хранилищу при старте приложения:
   * 1. Пропускает инициализацию в тестовом окружении (NODE_ENV=test)
   * 2. Проверяет существование бакета
   * 3. Создает бакет и настраивает политики доступа если бакет не существует
   * 4. Логирует результат операции
   * 5. Завершает процесс при критических ошибках
   *
   * @throws {Error} Завершает процесс с кодом 1 при ошибке подключения
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    try {
      if (process.env.NODE_ENV === 'test') {
        return
      }

      const bucketExists = await this.bucketExists(this.bucket)

      if (!bucketExists) {
        this.logger.log(
          `Бакета '${this.bucket}' не существует. Создаю...`,
          MinioService.name
        )
        try {
          await this.makeBucket(this.bucket)
          await this.setBucketPolicy(
            this.bucket,
            JSON.stringify(getS3BucketPolicy(this.bucket))
          )

          this.logger.log(`Бакет '${this.bucket}' создан.`, MinioService.name)
        } catch {
          this.logger.error(
            `Ошибка при создании бакета '${this.bucket}'!`,
            {},
            MinioService.name
          )
          process.exit(1)
        }
      }

      this.logger.log(
        'Подключение к S3-хранилищу установлено!',
        MinioService.name
      )
    } catch {
      this.logger.error(
        'Ошибка подключения к S3-хранилищу!',
        {},
        MinioService.name
      )
      process.exit(1)
    }
  }
}
