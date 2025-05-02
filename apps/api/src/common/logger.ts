import { loggerOptionsFactory } from '@repo/shared'
import { createLogger } from 'winston'

import { APP_NAME } from '#/common/constants'

/**
 * Глобальный логгер приложения
 * @constant {Logger} logger
 * @description Преднастроенный экземпляр логгера для всего приложения.
 * Создается на основе фабрики конфигурации с именем приложения.
 *
 * @example
 * // Использование логгера
 * logger.log('Запуск приложения...');
 * logger.error('Ошибка подключения', error);
 *
 * @example
 * // Логирование с контекстом
 * logger.warn('Предупреждение', { context: 'DatabaseModule' });
 *
 * @see loggerOptionsFactory Функция создания конфигурации логгера
 * @see APP_NAME Название приложения, используемое в логах
 */
export const logger = createLogger(loggerOptionsFactory({ appName: APP_NAME }))
