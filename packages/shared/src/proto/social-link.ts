import { Observable } from 'rxjs'

import { base } from './base'
import { user } from './user'

/**
 * Пространство имен для работы с социальными ссылками через gRPC сервис
 * @namespace social_link
 */
export namespace social_link {
  /**
   * Название gRPC пакета
   * @constant {string} PACKAGE_NAME
   * @default 'social_link'
   */
  export const PACKAGE_NAME = 'social_link'

  /**
   * Интерфейс социальной ссылки
   * @interface SocialLink
   * @memberof social_link
   */
  export interface SocialLink {
    /**
     * Уникальный идентификатор ссылки
     */
    id: string

    /**
     * Алиас (человекочитаемый идентификатор) ссылки
     */
    alias: string

    /**
     * Название социальной ссылки
     */
    title: string

    /**
     * URL адрес социальной ссылки
     * @format uri
     */
    href: string

    /**
     * Создатель ссылки (опционально)
     * @optional
     */
    creator?: user.User

    /**
     * Идентификатор создателя ссылки
     */
    creator_id: string

    /**
     * Дата создания ссылки в формате строки
     * @format date-time
     */
    created_at: string

    /**
     * Иконка социальной сети (опционально)
     * @optional
     */
    icon?: string
  }

  /**
   * Коллекция социальных ссылок
   * @interface SocialLinks
   * @memberof social_link
   */
  export interface SocialLinks {
    /**
     * Массив социальных ссылок
     */
    items: SocialLink[]
  }

  /**
   * Клиент gRPC сервиса для работы с социальными ссылками
   * @interface SocialLinkServiceClient
   * @memberof social_link
   */
  export interface SocialLinkServiceClient {
    /**
     * Получить список социальных ссылок с пагинацией
     * @param {base.PaginationRequest} data - Параметры пагинации
     * @returns {Observable<SocialLinks>} - Поток с коллекцией социальных ссылок
     */
    GetSocialLinks(data: base.PaginationRequest): Observable<SocialLinks>
  }

  /**
   * Контроллер gRPC сервиса для работы с социальными ссылками (серверная реализация)
   * @interface SocialLinkServiceController
   * @memberof social_link
   */
  export interface SocialLinkServiceController {
    /**
     * Обработчик запроса получения социальных ссылок
     * @param {base.PaginationRequest} request - Параметры пагинации
     * @returns {(Promise<SocialLinks> | Observable<SocialLinks> | SocialLinks)} - Результат выполнения
     * @description Может возвращать:
     * - Promise для асинхронных операций
     * - Observable для потоковой передачи
     * - Синхронный результат
     */
    GetSocialLinks(
      request: base.PaginationRequest
    ): Promise<SocialLinks> | Observable<SocialLinks> | SocialLinks
  }
}
