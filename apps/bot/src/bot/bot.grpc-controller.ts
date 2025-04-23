import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { bot } from '@repo/shared'
import { from, Observable, ObservableInput } from 'rxjs'

@Controller()
export class BotGRPCController implements bot.BotServiceController {
  @GrpcMethod('BotService', 'Health')
  Health(): Observable<bot.HealthResponse> {
    return from<ObservableInput<bot.HealthResponse>>([
      {
        status: 'healthly',
      },
    ])
  }

  @GrpcMethod('BotService', 'SendMessage')
  SendMessage(
    request: bot.SendMessageRequest
  ): Observable<bot.SendMessageResponse> {
    return from<ObservableInput<bot.SendMessageResponse>>([
      {
        status: request.message,
      },
    ])
  }
}
