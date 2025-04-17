import * as grpc from '@grpc/grpc-js'
import { ReflectionService } from '@grpc/reflection'
import { join } from 'path'

import { LoggerService } from '#/core/logger'

import { HealthResponse } from '../proto/interfaces/bot/HealthResponse'
import { SendMessageRequest__Output } from '../proto/interfaces/bot/SendMessageRequest'
import { SendMessageResponse } from '../proto/interfaces/bot/SendMessageResponse'
import { Empty__Output } from '../proto/interfaces/google/protobuf/Empty'
import { createProto, loadProto } from './utils'

export const bootstrapGrpcServer = async (port: number) => {
  const logger = LoggerService.getInstance()

  const packageDefinition = loadProto(join(__dirname, '../proto/bot.proto'))

  if (!packageDefinition) {
    process.exit(1)
  }

  const proto = createProto(packageDefinition)

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
        status: 'okk',
      })
    },
  })

  // eslint-disable-next-line @typescript-eslint/await-thenable
  await grpcServer.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        logger.error(err.message)

        process.exit(1)
      }

      logger.info(`GRPC-сервер успешно запущен! Порт: \x1b[34m${port}\x1b[0m.`)
    }
  )

  return grpcServer
}
