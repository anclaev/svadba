import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common"

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    // this.cache.stores.map((cache) => {
    //   const store = cache.store.client

    //   console.log(store)
    // })

    try {
      await this.cache.set("init", "init", 100)

      this.logger.log(
        "Подключение к серверу Redis установлено!",
        "RedisService",
      )

      await this.cache.del("init")
    } catch {
      this.logger.error("Ошибка подключения к серверу Redis", "RedisService")
      process.exit(1)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.cache.get<T>(key)
  }

  async set<T>(key: string, value: any, ttl?: number): Promise<T> {
    return await this.cache.set<T>(key, value, ttl)
  }

  async del(key: string): Promise<boolean> {
    return await this.cache.del(key)
  }
}
