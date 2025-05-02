/**
 * Интерфейс, представляющий результат пагинированного запроса с данными и мета-информацией.
 *
 * @template Entity - Тип элементов в массиве данных
 * @interface IPaginationResult
 * @example
 * // Пример использования с типом User
 * const result: IPaginationResult<User> = {
 *   data: [{ id: 1, name: 'Иван' }, { id: 2, name: 'Мария' }],
 *   meta: {
 *     total: 50,
 *     lastPage: 5,
 *     currentPage: 1,
 *     totalPerPage: 10,
 *     prevPage: null,
 *     nextPage: 2
 *   }
 * };
 */
export interface IPaginationResult<Entity> {
  /**
   * Массив элементов текущей страницы
   */
  data: Entity[]

  /**
   * Мета-информация о пагинации
   */
  meta: {
    /**
     * Общее количество элементов во всех страницах
     */
    total: number

    /**
     * Номер последней страницы
     */
    lastPage: number

    /**
     * Текущая страница
     */
    currentPage: number

    /**
     * Количество элементов на текущей странице (может отличаться от запрошенного размера для последней страницы)
     */
    totalPerPage: number

    /**
     * Номер предыдущей страницы или null, если текущая страница первая
     */
    prevPage: number | null

    /**
     * Номер следующей страницы или null, если текущая страница последняя
     */
    nextPage: number | null
  }
}
