import { Observable } from 'rxjs'

export namespace bot {
  export const PACKAGE_NAME = 'bot'

  export interface SendMessageResponse {
    status: string
  }

  export interface SendMessageRequest {
    message: string
    telegram_id: string
    app_token: string
  }

  export interface BotServiceClient {
    SendMessage(data: SendMessageRequest): SendMessageRequest
  }

  export interface BotServiceController {
    SendMessage(
      request: SendMessageRequest
    ):
      | Promise<SendMessageRequest>
      | SendMessageRequest
      | Observable<SendMessageRequest>
  }
}
