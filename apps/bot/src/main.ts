import { ClassSerializerInterceptor } from "@nestjs/common"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"
import { NestFactory, Reflector } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import * as fs from "fs"

import { AppModule } from "#/app/app.module"

import { loggerFactory } from "#/common/logger"

import { ConfigService } from "#/config/config.service"

async function bootstrap() {
  const logger = loggerFactory({})

  const isDev = process.env.NODE_ENV === "development"
  const httpsOptions: HttpsOptions = {}

  if (isDev) {
    httpsOptions.cert = fs.readFileSync("./src/certs/localhost.crt")
    httpsOptions.key = fs.readFileSync("./src/certs/localhost.key")
  }

  const app = await NestFactory.create(AppModule, {
    logger,
    httpsOptions: isDev ? httpsOptions : undefined,
  })

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const config = app.get(ConfigService)
  const host = config.env("HOST")
  const port = config.env("PORT")

  app.use(cookieParser(config.env("COOKIE_SECRET")))

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`, "App")
  })
}

bootstrap()
