import { HttpAdapterHost, NestFactory } from '@nestjs/core'
// import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { HttpStatus } from '@nestjs/common'

import { AppModule } from '#app/app.module'

import { ConfigService } from '#infra/core/config/config.service'
import { loggerFactory } from '#infra/core/logger'

async function bootstrap() {
  const logger = loggerFactory({})

  const app = await NestFactory.create(AppModule, { logger })

  const { httpAdapter } = app.get(HttpAdapterHost)

  const config = app.get(ConfigService)
  const host = config.env('HOST')
  const port = config.env('PORT')

  // app.useGlobalFilters(
  //   new PrismaClientExceptionFilter(httpAdapter, {
  //     P2000: HttpStatus.BAD_REQUEST,
  //     P2002: HttpStatus.CONFLICT,
  //     P2025: HttpStatus.NOT_FOUND,
  //   })
  // )

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (${host}:${port})`)
  })
}

bootstrap()
