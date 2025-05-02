import { LoggerService } from '@nestjs/common'
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
  WinstonModuleOptions,
} from 'nest-winston'
import { format, transports } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

import { LocalLoggerOptions } from './types'

/**
 * Фабрика для создания настроек логгера на основе LocalLoggerOptions
 *
 * @param {LocalLoggerOptions} params - Параметры для создания настроек логгера
 * @param {string} params.appName - Название приложения (обязательное)
 * @param {boolean} [params.exitOnError] - Завершать ли процесс при ошибках (опционально)
 * @returns {Object} Конфигурация логгера для winston
 * @returns {ConsoleTransportInstance[]} returns.transports - Настроенные транспорты для логирования
 * @returns {boolean|undefined} returns.exitOnError - Флаг завершения процесса при ошибках
 *
 * @example
 * // Создание конфигурации логгера
 * const options = loggerOptionsFactory({
 *   appName: 'my-app',
 *   exitOnError: true
 * });
 *
 * @description
 * Создает стандартную конфигурацию логгера с:
 * - Выводом в консоль
 * - Обработкой исключений
 * - Форматированием с timestamp и миллисекундами
 * - Цветным выводом
 * - Отображением имени приложения
 *
 * Формат вывода логов:
 * [время] [уровень] [appName] [длительность] сообщение
 *
 * @see {@link LocalLoggerOptions} параметры локального логгера
 */
export const loggerOptionsFactory = ({
  appName,
  exitOnError,
}: LocalLoggerOptions): {
  transports: ConsoleTransportInstance[]
  exitOnError: boolean | undefined
} => ({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike(appName, {
          colors: true,
          prettyPrint: true,
          processId: false,
          appName: true,
        })
      ),
    }),
  ],
  exitOnError,
})

/**
 * Фабрика для создания экземпляра логгера Winston с заданными настройками
 *
 * @param {LocalLoggerOptions} options - Настройки логгера
 * @param {string} options.appName - Название приложения (обязательное)
 * @param {boolean} [options.exitOnError] - Завершать ли процесс при ошибках логирования (опционально)
 * @returns {LoggerService} Готовый экземпляр логгера Winston
 *
 * @example
 * // Создание логгера с минимальными настройками
 * const logger = loggerFactory({
 *   appName: 'my-app'
 * });
 *
 * @example
 * // Создание логгера с включенным выходом при ошибках
 * const logger = loggerFactory({
 *   appName: 'my-service',
 *   exitOnError: true
 * });
 *
 * @description
 * Создает и возвращает готовый к использованию логгер Winston:
 * 1. Принимает базовые настройки через LocalLoggerOptions
 * 2. Формирует полную конфигурацию через loggerOptionsFactory
 * 3. Инициализирует логгер с помощью WinstonModule.createLogger
 *
 * @see {@link loggerOptionsFactory} для деталей конфигурации логгера
 * @see {@link LocalLoggerOptions} для доступных параметров настройки
 */
export const loggerFactory = (options: LocalLoggerOptions): LoggerService =>
  WinstonModule.createLogger(
    loggerOptionsFactory(options) as WinstonModuleOptions
  )
