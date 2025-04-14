import { ConfigService } from '#/core/config'
import { LoggerService } from '#/core/logger'

import { bootstrapBot } from '#/bot/bootstrap'
import { bootstrapGrpcServer } from '#/grpc/bootstrap'

const bootstrap = () => {
  const logger = LoggerService.getInstance()
  const config = ConfigService.getInstance()
  const grpcPort = config.get('GRPC_PORT')

  bootstrapBot()

  bootstrapGrpcServer(grpcPort)
}

bootstrap()
