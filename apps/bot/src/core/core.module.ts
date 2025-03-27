import { createKeyv } from "@keyv/redis"
import { CacheModule } from "@nestjs/cache-manager"
import { Global, Logger, Module } from "@nestjs/common"

import { ConfigService } from "#/config/config.service"

import { MinioService } from "./minio.service"
import { PrismaService } from "./prisma.service"
import { RedisService } from "./redis.service"

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        stores: [
          createKeyv({
            url: `redis://${config.env("REDIS_HOST")}:${config.env("REDIS_PORT")}`,
            username: config.env("REDIS_USERNAME"),
            password: config.env("REDIS_PASSWORD"),
            socket: {
              host: config.env("REDIS_HOST"),
              port: config.env("REDIS_PORT"),
              tls: false,
            },
          }),
        ],
      }),
    }),
  ],
  providers: [Logger, PrismaService, MinioService, RedisService],
  exports: [PrismaService, MinioService, RedisService],
})
export class CoreModule {}
