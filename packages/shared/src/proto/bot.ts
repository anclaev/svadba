import { Observable } from 'rxjs'

/**
 * Пространство имён, содержащее определения для gRPC сервиса бота
 * @namespace bot
 */
export namespace bot {
  /**
   * Название пакета для gRPC сервиса
   * @constant {string} PACKAGE_NAME
   * @default 'bot'
   */
  export const PACKAGE_NAME = 'bot'

  export interface HealthResponse {
    status: string
  }

  export interface SendMessageResponse {
    /**
     * Статус выполнения операции
     * @example 'OK' - при успешной отправке
     * @example 'ERROR' - при ошибке
     */
    status: string
  }

  /**
   * Интерфейс запроса на отправку сообщения
   * @interface SendMessageRequest
   * @memberof bot
   */
  export interface SendMessageRequest {
    /**
     * Текст сообщения для отправки
     */
    message: string

    /**
     * ID телеграм-пользователя
     * @pattern ^[0-9]+$ - должен содержать только цифры
     */
    telegram_id: string

    /**
     * Токен приложения для авторизации
     * @minLength 10 - минимальная длина токена
     */
    app_token: string
  }

  /**
   * Интерфейс клиента gRPC сервиса бота
   * @interface BotServiceClient
   * @memberof bot
   */
  export interface BotServiceClient {
    Health(): HealthResponse
    SendMessage(data: SendMessageRequest): SendMessageResponse
  }

  /**
   * Интерфейс контроллера gRPC сервиса бота (серверная реализация)
   * @interface BotServiceController
   * @memberof bot
   */
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
