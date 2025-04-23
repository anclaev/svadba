/**
 * Проверяет, является ли переданное значение undefined
 * @param {unknown} value - Значение для проверки
 * @returns {boolean} Возвращает true, если значение равно undefined, иначе false
 * @example
 * // Возвращает true
 * isUndefined(undefined);
 *
 * // Возвращает false
 * isUndefined(null);
 * isUndefined(0);
 * isUndefined('');
 *
 * @description
 * Функция выполняет строгую проверку типа через typeof оператор.
 * Отличается от проверки на "falsy" значения, так как возвращает true только для undefined.
 */
export const isUndefined = (value: unknown): boolean =>
  typeof value === 'undefined'

/**
 * Проверяет, является ли значение null
 *
 * @param {unknown} value - Проверяемое значение любого типа
 * @returns {boolean} Возвращает true, если значение строго равно null, иначе false
 *
 * @example
 * // Возвращает true
 * isNull(null);
 *
 * @example
 * // Возвращает false
 * isNull(undefined);
 * isNull(0);
 * isNull('');
 * isNull(false);
 *
 * @description
 * Функция выполняет строгое сравнение (===) с null.
 * В отличие от проверки на falsy-значения, возвращает true только для null.
 *
 * @see {@link isUndefined} для проверки на undefined
 */
export const isNull = (value: unknown): boolean => value === null
