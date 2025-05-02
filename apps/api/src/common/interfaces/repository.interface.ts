import { IPaginationParams, IPaginationResult } from '@repo/shared'

/**
 * Базовый интерфейс репозитория для работы с сущностями
 * @interface IRepository
 * @template Entity - Тип сущности, с которой работает репозиторий
 * @template EntityError - Тип ошибки, возвращаемый при неудачных операциях
 *
 * @description Определяет стандартный набор CRUD-операций для работы с сущностями:
 * - Создание, чтение, обновление, удаление (CRUD)
 * - Поиск по идентификатору и уникальным полям
 * - Пагинированный поиск с фильтрацией
 *
 * @example
 * // Пример реализации для User сущности
 * class UserRepository implements IRepository<User, UserError> {
 *   // ...реализация методов
 * }
 */
export interface IRepository<Entity, EntityError> {
  /**
   * Проверяет существование сущности по ID
   * @method exists
   * @param {string} id - Идентификатор сущности
   * @returns {Promise<boolean | EntityError>}
   *   - true/false если сущность существует/не существует
   *   - EntityError в случае ошибки
   * @optional
   */
  exists?(id: string): Promise<boolean | EntityError>

  /**
   * Создает новую сущность
   * @method create
   * @param {Entity} entity - Данные для создания сущности
   * @returns {Promise<Entity | EntityError>}
   *   - Созданная сущность
   *   - EntityError в случае ошибки
   */
  create(entity: Entity): Promise<Entity | EntityError>

  /**
   * Обновляет существующую сущность
   * @method update
   * @param {Entity} entity - Данные для обновления сущности
   * @returns {Promise<Entity | EntityError>}
   *   - Обновленная сущность
   *   - EntityError в случае ошибки
   */
  update(entity: Entity): Promise<Entity | EntityError>

  /**
   * Удаляет сущность по ID
   * @method delete
   * @param {string} id - Идентификатор сущности
   * @returns {Promise<boolean | EntityError>}
   *   - true если удаление успешно
   *   - EntityError в случае ошибки
   */
  delete(id: string): Promise<boolean | EntityError>

  /**
   * Находит сущность по ID
   * @method findById
   * @param {string} id - Идентификатор сущности
   * @returns {Promise<Entity | EntityError>}
   *   - Найденная сущность
   *   - EntityError если сущность не найдена или произошла ошибка
   */
  findById(id: string): Promise<Entity | EntityError>

  /**
   * Находит сущность по уникальному полю
   * @method findByUnique
   * @param {keyof Entity} field - Уникальное поле сущности
   * @returns {Promise<Entity | EntityError>}
   *   - Найденная сущность
   *   - EntityError если сущность не найдена или произошла ошибка
   * @optional
   */
  findByUnique?(field: keyof Entity): Promise<Entity | EntityError>

  /**
   * Находит несколько сущностей с пагинацией и фильтрацией
   * @method findMore
   * @param {Partial<IPaginationParams>} paginationParams - Параметры пагинации
   * @param {unknown} queryParams - Параметры фильтрации
   * @returns {Promise<IPaginationResult<Entity> | EntityError>}
   *   - Результат с данными и мета-информацией о пагинации
   *   - EntityError в случае ошибки
   */
  findMore(
    paginationParams: Partial<IPaginationParams>,
    queryParams: unknown
  ): Promise<IPaginationResult<Entity> | EntityError>
}
