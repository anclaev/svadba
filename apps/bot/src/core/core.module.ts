import { createKeyv } from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Global, Logger, Module } from '@nestjs/common'
import Redis from 'ioredis'

import { ConfigService } from '#/config/config.service'

import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { MinioService } from './minio.service'
import { PrismaService } from './prisma.service'
import { RedisService } from './redis.service'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        stores: [
          createKeyv({
            url: `redis://${config.env('REDIS_HOST')}:${config.env('REDIS_PORT')}`,
            username: config.env('REDIS_USERNAME'),
            password: config.env('REDIS_PASSWORD'),
            socket: {
              host: config.env('REDIS_HOST'),
              port: config.env('REDIS_PORT'),
              tls: false,
            },
          }),
        ],
      }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [{ limit: 10, ttl: seconds(60) }],
        storage: new ThrottlerStorageRedisService(
          new Redis({
            host: config.env('REDIS_HOST'),
            port: config.env('REDIS_PORT'),
            username: config.env('REDIS_USERNAME'),
            password: config.env('REDIS_PASSWORD'),
          })
        ),
      }),
    }),
  ],
  providers: [Logger, PrismaService, MinioService, RedisService],
  exports: [PrismaService, MinioService, RedisService],
})
export class CoreModule {}
