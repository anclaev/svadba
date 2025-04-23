import { createKeyv } from '@keyv/redis'
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Global, Logger, Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { ConfigService } from '@repo/shared'
import Redis from 'ioredis'
import { join } from 'path'

import { Config } from '#/common/config.schema'

// import { ConfigService } from '#/config/config.service'
import { MinioService } from './minio.service'
import { PrismaService } from './prisma.service'
import { RedisService } from './redis.service'

/**
 * Глобальный core-модуль приложения
 * @module CoreModule
 * @description
 * Содержит основные сервисы и конфигурации, используемые во всем приложении:
 * - Кеширование через Redis
 * - Ограничение запросов (rate limiting)
 * - Обслуживание статических файлов
 * - Основные сервисы (Prisma, MinIO, Redis)
 *
 * @Global
 * @decorator @Global() - делает модуль доступным во всем приложении без явного импорта
 */
@Global()
@Module({
  imports: [
    /**
     * Асинхронная регистрация модуля кеширования
     * @property {boolean} isGlobal - Глобальная видимость модуля
     * @property {Function} useFactory - Фабрика конфигурации
     * @description
     * Настраивает Redis-кеш для текущего окружения.
     * В тестовом окружении (NODE_ENV=test) кеш отключен.
     */
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (config: ConfigService<Config>) => {
        return {
          stores:
            process.env.NODE_ENV !== 'test'
              ? [
                  createKeyv({
                    url: `redis://${config.env('REDIS_HOST')}:${config.env('REDIS_PORT')}`,
                    username: config.env('REDIS_USERNAME'),
                    password: config.env('REDIS_PASSWORD'),
                    socket: {
                      host: config.env('REDIS_HOST'),
                      port: Number(config.env('REDIS_PORT')),
                      tls: false,
                    },
                  }),
                ]
              : undefined,
        }
      },
    }),
    /**
     * Модуль ограничения запросов (rate limiting)
     * @property {Function} useFactory - Фабрика конфигурации
     * @description
     * Настраивает лимит запросов с использованием Redis в production окружении.
     * В тестовом окружении storage отключен.
     */
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config>) => ({
        throttlers: [
          {
            limit: Number(config.env('REQ_LIMIT')),
            ttl: seconds(Number(config.env('REQ_TTL'))),
          },
        ],
        storage:
          process.env.NODE_ENV !== 'test'
            ? new ThrottlerStorageRedisService(
                new Redis({
                  host: config.env('REDIS_HOST'),
                  port: Number(config.env('REDIS_PORT')),
                  username: config.env('REDIS_USERNAME'),
                  password: config.env('REDIS_PASSWORD'),
                })
              )
            : undefined,
      }),
    }),
    /**
     * Модуль для обслуживания статических файлов
     * @description
     * Предоставляет доступ к файлам из папки assets
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
  ],
  /**
   * Провайдеры модуля
   * @property {Provider} Logger - Сервис логирования
   * @property {Provider} PrismaService - Сервис работы с базой данных
   * @property {Provider} MinioService - Сервис работы с объектным хранилищем
   * @property {Provider} RedisService - Сервис работы с Redis
   */
  providers: [Logger, PrismaService, MinioService, RedisService],

  /**
   * Экспортируемые провайдеры
   * @property {Provider} PrismaService - Сервис БД
   * @property {Provider} MinioService - Сервис хранилища
   * @property {Provider} RedisService - Сервис кеширования
   */
  exports: [PrismaService, MinioService, RedisService],
})
export class CoreModule {}
