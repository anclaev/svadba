import fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { ConfigService } from '#/core/config'
import { LoggerService } from '#/core/logger'

import { bootstrapBot } from '#/bot/bootstrap'

import { grpcServerPlugin } from './grpc'

const app = fastify()

const bootstrap = async () => {
  const logger = LoggerService.getInstance()
  const config = ConfigService.getInstance()

  const port = config.get('PORT')
  const grpcPort = config.get('GRPC_PORT')

  bootstrapBot()

  app.register(grpcServerPlugin)

  app.get('/', async (_: FastifyRequest, __: FastifyReply) => {
    return { hello: 'world' }
  })

  await app
    .listen({
      port,
    })
    .then(() => {
      logger.info(`HTTP-сервер успешно запущен! Порт: \x1b[36m${port}\x1b[0m.`)
    })
    .catch((err) => {
      logger.error('Ошибка запуска сервиса:')
      console.log(err)
    })

  app.grpcServer.start(grpcPort)
}

bootstrap()
