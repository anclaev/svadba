import { Observable } from 'rxjs'

export namespace bot {
  export const PACKAGE_NAME = 'bot'

  export interface HealthResponse {
    status: string
  }

  export interface SendMessageResponse {
    status: string
  }

  export interface SendMessageRequest {
    message: string
    telegram_id: string
    app_token: string
  }

  export interface BotServiceClient {
    Health(): HealthResponse
    SendMessage(data: SendMessageRequest): SendMessageResponse
  }

  export interface BotServiceController {
    Health():
      | Promise<HealthResponse>
      | HealthResponse
      | Observable<HealthResponse>
    SendMessage(
      request: SendMessageRequest
    ):
      | Promise<SendMessageResponse>
      | SendMessageResponse
      | Observable<SendMessageResponse>
  }
}
