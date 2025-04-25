import { z } from 'zod'

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

/**
 * Преобразует строку с URL, разделенными запятыми, в массив URL с валидацией каждого элемента
 *
 * @param {string} str - Входная строка, содержащая URL, разделенные запятыми
 * @param {z.RefinementCtx} ctx - Контекст валидации Zod для добавления ошибок
 * @returns {string[] | z.NEVER} - Возвращает массив URL, если все они валидны,
 *                                 или z.NEVER с добавленной ошибкой в контекст, если найден невалидный URL
 *
 * @example
 * // Возвращает ['https://example.com', 'https://google.com']
 * zUrlArrayFromString('https://example.com,https://google.com', ctx);
 *
 * @example
 * // Добавляет ошибку в контекст и возвращает z.NEVER
 * zUrlArrayFromString('https://example.com,invalid-url', ctx);
 */
export const zUrlArrayFromString = (str: string, ctx: z.RefinementCtx) => {
  const urls = str.split(',')
  for (const url of urls) {
    if (!z.string().url().safeParse(url).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Некорретный URL: ${url}`,
      })

      return z.NEVER
    }
  }

  return urls
}
