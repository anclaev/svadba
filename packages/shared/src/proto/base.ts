/**
 * Пространство имён, содержащее базовые типы данных для gRPC API
 * @namespace base
 */
export namespace base {
  /**
   * Интерфейс запроса пагинации для gRPC сервисов
   * @interface PaginationRequest
   * @memberof base
   * @example
   * // Пример использования в gRPC клиенте:
   * const request: base.PaginationRequest = {
   *   page: 1,
   *   size: 20
   * };
   *
   * client.getItems(request, (error, response) => {
   *   // обработка ответа
   * });
   */
  export interface PaginationRequest {
    /**
     * Номер запрашиваемой страницы (начинается с 1)
     * @default 1
     * @minimum 1
     * @description Нумерация страниц обычно начинается с 1. Значение должно быть положительным.
     */
    page: number

    /**
     * Количество элементов на странице
     * @default 20
     * @minimum 1
     * @maximum 100
     * @description Сервер может накладывать ограничения на максимальное значение.
     *              Для gRPC рекомендуется устанавливать разумные лимиты (например, 100).
     */
    size: number
  }
}
