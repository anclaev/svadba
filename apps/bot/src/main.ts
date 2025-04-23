import { ReflectionService } from '@grpc/reflection'
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { bot, loggerFactory } from '@repo/shared'
import { join } from 'path'

import { APP_NAME } from './common/constants'

import { ConfigService } from '#/config/config.service'

import { AppModule } from '#/app/app.module'

import './instrument'

async function bootstrap() {
  const logger = loggerFactory({ appName: APP_NAME })

  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    snapshot: true,
    logger,
  })

  const config = app.get(ConfigService)
  const port = config.env('PORT')
  const grpcPort = config.env('GRPC_PORT')

  // Включение хуков жизненного цикла
  app.enableShutdownHooks()

  // Подключение gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `localhost:${grpcPort}`,
      package: bot.PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/bot.proto'),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      onLoadPackageDefinition: (pkg: any, server: any) => {
        new ReflectionService(pkg).addToServer(server)
      },
    },
  })

  await app.startAllMicroservices()

  await app.listen(port).finally(() => {
    logger.log(
      `HTTP-сервис успешно запущен на порту: \x1b[34m${port}\x1b[0m`,
      'App'
    )
    logger.log(
      `gRPC-сервис успешно запущен на порту: \x1b[34m${grpcPort}\x1b[0m`,
      'App'
    )
  })
}

bootstrap()
