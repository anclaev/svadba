import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface'
import { NestFactory, Reflector } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { loggerFactory, social_link } from '@repo/shared'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as bearerToken from 'express-bearer-token'
import * as fs from 'fs'
import helmet from 'helmet'
import { patchNestJsSwagger } from 'nestjs-zod'
import { join } from 'path'

import { APP_NAME } from '#/common/constants'

import { AppModule } from '#/app/app.module'

import { ConfigService } from '#/config/config.service'

import './instrument'

async function bootstrap() {
  const logger = loggerFactory({ appName: APP_NAME })

  const isDev = process.env.NODE_ENV === 'development'
  const httpsOptions: HttpsOptions = {}

  // SSL для разработки
  if (isDev) {
    httpsOptions.cert = fs.readFileSync('./src/certs/localhost.crt')
    httpsOptions.key = fs.readFileSync('./src/certs/localhost.key')
  }

  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    snapshot: true,
    logger,
    httpsOptions: isDev ? httpsOptions : undefined,
  })

  // Глобальная сериализация
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const config = app.get(ConfigService)
  const host = config.env('HOST')
  const port = config.env('PORT')
  const origin = config.env('ORIGIN')
  const version = config.env('APP_VERSION')

  // Поддержка cookie
  app.use(cookieParser(config.env('COOKIE_SECRET')))

  // Заголовки безопасности
  app.use(helmet())

  // Базовое сжатие ответов
  app.use(compression())

  // Перехватчик bearer-токенов
  app.use(bearerToken())

  // Включение хуков жизненного цикла
  app.enableShutdownHooks()

  // Поддержка CORS
  app.enableCors({
    credentials: true,
    origin,
  })

  // Подключение gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: social_link.PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/social-link.proto'),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
    },
  })

  // Настройка Swagger
  patchNestJsSwagger()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Svadba API')
    .setDescription('Серверная часть проекта Svadba')
    .setVersion(version)
    .build()

  const swaggerDocFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/api', app, swaggerDocFactory, {
    customSiteTitle: 'Svadba API',
    customfavIcon: '/favicon.ico',
    customCssUrl: '/swagger.css',
  })

  await app.startAllMicroservices()

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`, 'App')
  })
}

bootstrap()
