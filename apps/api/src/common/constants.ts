/**
 * Название приложения
 * @constant {string} APP_NAME
 * @default 'Svadba API'
 * @description Используется для идентификации приложения в логах и системных сообщениях
 */
export const APP_NAME = 'Svadba API'

/**
 * Минимальная длина логина пользователя
 * @constant {number} USER_LOGIN_MIN_LENGTH
 * @default 8
 * @description Используется для ограничения минимальной длины логина пользователя
 */
export const USER_LOGIN_MIN_LENGTH = 4

/**
 * Минимальная длина пароля пользователя
 * @constant {number} USER_PASSWORD_MIN_LENGTH
 * @default 8
 * @description Используется для ограничения минимальной длины пароля пользователя
 */
export const USER_PASSWORD_MIN_LENGTH = 8

/**
 * Константы времени жизни в миллисекундах
 * @constant {Object} TTL_MS
 * @readonly
 * @description Содержит стандартные интервалы времени в миллисекундах:
 * - От секунды до недели
 * - INFINITE (0) для значений без срока действия
 *
 * @property {number} INFINITE=0 - Бесконечный срок действия (0 мс)
 * @property {number} SECOND=1000 - 1 секунда (1000 мс)
 * @property {number} MINUTE=60000 - 1 минута (60000 мс)
 * @property {number} HOUR=3600000 - 1 час (3600000 мс)
 * @property {number} DAY=86400000 - 1 день (86400000 мс)
 * @property {number} WEEK=604800000 - 1 неделя (604800000 мс)
 *
 * @example
 * // Установка TTL для кеша на 1 день
 * cache.set('key', 'value', TTL_MS.DAY);
 */
export const TTL_MS = {
  INFINITE: 0,
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
  WEEK: 604800000,
} as const

/**
 * Ключи Redis для хранения данных
 * @constant {Object} REDIS_KEY
 * @readonly
 * @description Содержит стандартные ключи для Redis хранилища
 *
 * @property {string} REFRESH_TOKEN='refresh-token' - Ключ для хранения refresh-токенов
 *
 * @example
 * // Использование ключа для работы с Redis
 * redisClient.get(REDIS_KEY.REFRESH_TOKEN);
 */
export const REDIS_KEY = {
  REFRESH_TOKEN: 'refresh-token',
} as const
