import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface'
import { NestFactory } from '@nestjs/core'
import * as fs from 'fs'

import { AppModule } from '#/app/app.module'

import { ConfigService } from '#/core/config/config.service'
import { loggerFactory } from '#/core/logger'

async function bootstrap() {
  const logger = loggerFactory({})

  const isDev = process.env.NODE_ENV === 'development'
  const httpsOptions: HttpsOptions = {}

  if (isDev) {
    httpsOptions.cert = fs.readFileSync('./src/certs/localhost.crt')
    httpsOptions.key = fs.readFileSync('./src/certs/localhost.key')
  }

  const app = await NestFactory.create(AppModule, { logger, httpsOptions })

  const config = app.get(ConfigService)
  const host = config.env('HOST')
  const port = config.env('PORT')

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`)
  })
}

bootstrap()
