import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ReflectionService } from '@grpc/reflection'
import fp from 'fastify-plugin'
import { join } from 'path'

import { LoggerService } from '#/core/logger'

import { ProtoGrpcType } from './proto/interfaces/bot'
import { HealthResponse } from './proto/interfaces/bot/HealthResponse'
import { SendMessageRequest__Output } from './proto/interfaces/bot/SendMessageRequest'
import { SendMessageResponse } from './proto/interfaces/bot/SendMessageResponse'
import { Empty__Output } from './proto/interfaces/google/protobuf/Empty'

declare module 'fastify' {
  interface FastifyInstance {
    grpcServer: {
      start: (port: number) => void
    }
  }
}

const grpcServerOptions = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
}

export const grpcServerPlugin = fp((fastify) => {
  const logger = LoggerService.getInstance()

  // load proto files from directory
  const packageDefinition = protoLoader.loadSync(
    [join(__dirname, 'proto/bot.proto')],
    grpcServerOptions
  )

  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType

  const reflection = new ReflectionService(packageDefinition)

  const grpcServer = new grpc.Server()

  reflection.addToServer(grpcServer)

  // mapping between handlers and rpc services
  grpcServer.addService(proto.bot.BotService.service, {
    Health: (
      req: grpc.ServerUnaryCall<Empty__Output, HealthResponse>,
      res: grpc.sendUnaryData<HealthResponse>
    ) => {
      return res(null, {
        status: 'healthly',
      })
    },
    SendMessage: (
      req: grpc.ServerUnaryCall<
        SendMessageRequest__Output,
        SendMessageResponse
      >,
      res: grpc.sendUnaryData<SendMessageResponse>
    ) => {
      return res(null, {
        status: 'OK"',
      })
    },
  })

  function start(port: number) {
    return grpcServer.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          logger.error(err.message)

          process.exit(1)
        }

        logger.info(
          `GRPC-сервер успешно запущен! Порт: \x1b[34m${port}\x1b[0m.`
        )
      }
    )
  }

  fastify.decorate('grpcServer', { start })
})
