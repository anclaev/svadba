import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron, CronExpression } from '@nestjs/schedule'

import { RegistrationLinkError } from '../../domain'

import { ClearExpiredLinksCommand } from '../commands'

/**
 * Сервис для работы с регистрационными ссылками
 * @class
 * @public
 */
@Injectable()
export class RegistrationLinkService {
  private context: string = 'Auth'

  /**
   * Создает экземпляр сервиса
   * @constructor
   * @param {CommandBus} commandBus - Шина команд для выполнения CQRS команд
   * @param {Logger} logger - Логгер для записи событий
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}

  /**
   * Очищает просроченные регистрационные ссылки
   * @method
   * @public
   * @async
   *
   * @description
   * Этот метод выполняется каждый день в полночь (по расписанию Cron)
   * и удаляет все просроченные регистрационные ссылки.
   *
   * @returns {Promise<void>} Не возвращает значимых данных, только логирует результат
   *
   * @example
   * await registrationLinkService.clearExpiredRegistrationLinks();
   *
   * @see {@link Cron} Декоратор для настройки расписания выполнения
   * @see {@link ClearExpiredLinksCommand} Команда для очистки ссылок
   * @see {@link RegistrationLinkError} Ошибка, которая может возникнуть при выполнении
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearExpiredRegistrationLinks(): Promise<void> {
    this.logger.debug(
      'Запуск очистки просроченных регистрационных ссылок...',
      this.context
    )

    const deletedLinks = await this.commandBus.execute(
      new ClearExpiredLinksCommand({ date: new Date() })
    )

    if (deletedLinks instanceof RegistrationLinkError) {
      this.logger.error(
        'Ошибка очистки просроченных регистрационных ссылок!',
        {},
        this.context
      )

      return
    }

    if (deletedLinks > 0) {
      this.logger.log(
        `Успешно очищено ${deletedLinks} регистрационных ссылок.`,
        this.context
      )
    } else {
      this.logger.debug(
        `Нет просроченных регистрационных ссылок для удаления.`,
        this.context
      )
    }
  }
}
