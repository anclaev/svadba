/**
 * Настройки для локального логгера
 * @typedef {Object} LocalLoggerOptions
 * @property {string} appName - Название приложения (обязательное)
 * @property {boolean} [exitOnError] - Завершать ли процесс при ошибках логирования (опционально)
 *
 * @example
 * // Минимальная конфигурация:
 * const options: LocalLoggerOptions = {
 *   appName: 'my-app'
 * };
 *
 * @example
 * // С включенным выходом при ошибках:
 * const options: LocalLoggerOptions = {
 *   appName: 'my-app',
 *   exitOnError: true
 * };
 *
 * @description
 * Используется для настройки поведения локального логгера.
 * Обязательным является только указание имени приложения (appName).
 * Остальные параметры имеют значения по умолчанию.
 */
export type LocalLoggerOptions = {
  /**
   * Название приложения, используемое в логах
   * @required
   */
  appName: string

  /**
   * Следует ли завершать процесс при возникновении ошибок логирования
   * @default false
   * @optional
   */
  exitOnError?: boolean
}
