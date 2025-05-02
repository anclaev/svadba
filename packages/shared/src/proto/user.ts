/**
 * Пространство имен для работы с пользователями через gRPC сервис
 * @namespace user
 */
export namespace user {
  /**
   * Название gRPC пакета для сервиса пользователей
   * @constant {string} PACKAGE_NAME
   * @default 'user'
   */
  export const PACKAGE_NAME = 'user'

  /**
   * Интерфейс данных пользователя
   * @interface User
   * @memberof user
   * @description Содержит основную информацию о пользователе системы
   * @example
   * // Пример объекта пользователя:
   * {
   *   id: '123e4567-e89b-12d3-a456-426614174000',
   *   role: 'PUBLIC',
   *   login: 'ivanivanov',
   *   name: 'Иван Иванов',
   *   is_telegram_verified: true,
   *   created_at: '2023-01-01T00:00:00Z',
   *   telegram_id: '123456789'
   * }
   */
  export interface User {
    /**
     * Уникальный идентификатор пользователя (UUID)
     * @format uuid
     */
    id: string

    /**
     * Роль пользователя в системе
     * @example 'ADMIN' - Администратор
     * @example 'PUBLIC' - Обычный пользователь
     */
    role: string

    /**
     * Логин пользователя (username)
     */
    login: string

    /**
     * Полное имя пользователя
     * @example 'Иван Иванов"
     */
    name: string
    /**
     * Флаг подтверждения Telegram аккаунта
     * @default false
     */
    is_telegram_verified: boolean

    /**
     * Дата и время создания учетной записи
     * @format date-time
     */
    created_at: string

    /**
     * Идентификатор Telegram (опционально)
     * @optional
     * @pattern ^[0-9]+$ - должен содержать только цифры
     */
    telegram_id?: string
  }
}
