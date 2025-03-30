import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as bearerToken from 'express-bearer-token'
import * as fs from 'fs'
import helmet from 'helmet'
import { patchNestJsSwagger } from 'nestjs-zod'

import { AppModule } from '#/app/app.module'

import { loggerFactory } from '#/common/logger'

import { ConfigService } from '#/config/config.service'
async function bootstrap() {
  const logger = loggerFactory({})

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

  // Настройка Swagger
  patchNestJsSwagger()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Svadba Bot')
    .setDescription('Серверная часть проекта Svadba')
    .setVersion(version)
    .build()

  const swaggerDocFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/api', app, swaggerDocFactory, {
    customSiteTitle: 'Svadba Bot',
    customfavIcon: '/favicon.ico',
    customCssUrl: '/swagger.css',
  })

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`, 'App')
  })
}

bootstrap()
