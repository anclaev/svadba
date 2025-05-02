import { ReflectionService } from '@grpc/reflection'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface'
import { NestFactory, Reflector } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService, loggerFactory, social_link } from '@repo/shared'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bearerToken from 'express-bearer-token'
import * as fs from 'fs'
import helmet from 'helmet'
import { patchNestJsSwagger } from 'nestjs-zod'
import { join } from 'path'

import { Config } from '#/common/config.schema'
import { APP_NAME } from '#/common/constants'

import { AppModule } from '#/app/app.module'

import './instrument'

/**
 * Функция инициализации и запуска NestJS приложения
 * @async
 * @function bootstrap
 * @description Основная функция запуска приложения, выполняющая:
 * - Настройку логгера
 * - Конфигурацию HTTPS в development-режиме
 * - Создание экземпляра приложения
 * - Настройку глобальных интерцепторов
 * - Конфигурацию безопасности (helmet, CORS)
 * - Подключение микросервисов gRPC
 * - Настройку Swagger документации
 * - Запуск сервера
 *
 * @throws {Error} В случае ошибок при инициализации приложения
 *
 * @example
 * // Запуск приложения
 * bootstrap().catch(err => {
 *   console.error('Ошибка запуска приложения:', err);
 *   process.exit(1);
 * });
 */
async function bootstrap() {
  // Инициализация логгера с названием приложения
  const logger = loggerFactory({ appName: APP_NAME })

  // Проверка режима разработки
  const isDev = process.env.NODE_ENV === 'development'
  const httpsOptions: HttpsOptions = {}

  // Настройка HTTPS сертификатов для development режима
  if (isDev) {
    httpsOptions.cert = fs.readFileSync('./src/certs/localhost.crt')
    httpsOptions.key = fs.readFileSync('./src/certs/localhost.key')
  }

  // Создание экземпляра приложения NestJS
  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    snapshot: true,
    logger,
    httpsOptions: isDev ? httpsOptions : undefined,
  })

  // Настройка глобального интерцептора для сериализации
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // Получение конфигурации
  const config = app.get(ConfigService<Config>)
  const host = config.env('HOST')
  const port = config.env('PORT')
  const grpcPort = config.env('GRPC_PORT')
  const allowedOrigins = config.env('ALLOWED_ORIGINS')
  const version = config.env('APP_VERSION')

  // Настройка middlewares
  app.use(cookieParser(config.env('COOKIE_SECRET'))) // Поддержка cookies
  app.use(helmet()) // Защитные HTTP-заголовки
  app.use(compression()) // Сжатие ответов
  app.use(bearerToken()) // Парсинг Bearer токенов
  app.enableShutdownHooks() // Обработка хуков жизненного цикла

  // Настройка CORS
  app.enableCors({
    credentials: true,
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Set-Cookie'],
    allowedHeaders: ['Set-Cookie', 'Authorization'],
  })

  // Подключение gRPC микросервиса
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `localhost:${grpcPort}`,
      package: social_link.PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/social-link.proto'),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      onLoadPackageDefinition: (pkg: any, server: any) => {
        new ReflectionService(pkg).addToServer(server)
      },
    },
  })

  // Настройка Swagger документации
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

  // Запуск микросервисов и приложения
  await app.startAllMicroservices()
  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`, 'App')
  })
}

bootstrap()
