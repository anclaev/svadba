import { GrammyError, HttpError } from 'grammy'

import { ConfigService } from '#/core/config'
import { LoggerService } from '#/core/logger'

import { BotService } from './bot.service'

export const bootstrapBot = () => {
  const config = ConfigService.getInstance()
  const logger = LoggerService.getInstance()

  const bot = BotService.getInstance(config.get('TELEGRAM_BOT_TOKEN'))

  bot.catch(({ ctx, error }) => {
    logger.error(
      `[BotService] Ошибка при обработке обновления ${ctx.update.update_id}:`
    )

    if (error instanceof GrammyError) {
      logger.error('[BotService] Ошибка в запросе: ' + error.description)
    } else if (error instanceof HttpError) {
      logger.error('[BotService] Не удалось связаться с Telegram!')
    } else {
      logger.error('[BotService] Неизвестная ошибка.')
    }
  })

  bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))

  bot.start()

  logger.info('BotService успешно инициализирован.')
}
