import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { loggerFactory } from '@repo/shared';

import { APP_NAME } from '#/common/constants';

import { ConfigService } from '#/config/config.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = loggerFactory({ appName: APP_NAME });

  const app = await NestFactory.create<
    INestApplication<NestExpressApplication>
  >(AppModule, {
    snapshot: true,
    logger,
  });

  const config = app.get(ConfigService);
  const host = config.env('HOST');
  const port = config.env('PORT');

  // Включение хуков жизненного цикла
  app.enableShutdownHooks();

  await app.listen(port).finally(() => {
    logger.log(`Сервис успешно запущен! (https://${host}:${port})`, APP_NAME);
  });
}
bootstrap();
