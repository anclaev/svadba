import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

import { LoggerService } from '#/core/logger'

import { ProtoGrpcType } from '#/proto/interfaces/bot'
import { BotServiceClient } from '#/proto/interfaces/bot/BotService'
import { SendMessageRequest } from '#/proto/interfaces/bot/SendMessageRequest'

export const grpcServerOptions = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
}

export const loadProto = (
  path: string
): protoLoader.PackageDefinition | null => {
  const logger = LoggerService.getInstance()

  try {
    return protoLoader.loadSync([path], grpcServerOptions)
  } catch {
    logger.error('Ошибка загрузки proto-файлов GRPC.')
    return null
  }
}

export const createProto = (
  packageDefinition: protoLoader.PackageDefinition
): ProtoGrpcType => {
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType

  return proto
}

export const createClient = (
  protoPath: string,
  port: number
): BotServiceClient => {
  const packageDefinition = loadProto(protoPath)

  if (!packageDefinition) {
    process.exit(1)
  }

  const proto = createProto(packageDefinition)

  return new proto.bot.BotService(
    `0.0.0.0:${port}`,
    grpc.credentials.createInsecure()
  )
}

export const health = async (client: BotServiceClient, request: any) => {
  return new Promise((resolve, reject) => {
    client.Health(request, (error: any, response: any) => {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

export const sendMessage = async (
  client: BotServiceClient,
  request: SendMessageRequest
) => {
  return new Promise((resolve, reject) => {
    client.SendMessage(request, (error: any, response: any) => {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}
