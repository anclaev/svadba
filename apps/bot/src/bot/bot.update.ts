import { InjectBot, Start, Update } from '@grammyjs/nestjs'
import { Injectable, Logger, UseFilters } from '@nestjs/common'
import { ConfigService } from '@repo/shared'
import { Bot, InlineKeyboard } from 'grammy'

import { Config } from '#/common/config.schema'
import { BOT_NAME } from '#/common/constants'

import { GrammyExceptionFilter, IContext } from './lib'

@Update()
@UseFilters(GrammyExceptionFilter)
@Injectable()
export class BotUpdate {
  private readonly inlineKeyboard: InlineKeyboard
  private readonly botToken: string
  private readonly webEndpoint: string

  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Bot<IContext>,
    private readonly logger: Logger,
    private readonly config: ConfigService<Config>
  ) {
    this.botToken = this.config.env('TELEGRAM_BOT_TOKEN')
    this.webEndpoint = this.config.env('WEB_ENDPOINT')

    if (this.bot.isInited()) {
      this.logger.log(
        `Бот '${this.bot.botInfo.first_name}' успешно инициализирован.`,
        'App'
      )
      return
    }
    this.logger.log('Бот в ожидании инициализации.', 'App')
  }

  @Start()
  async onStart(ctx: IContext): Promise<void> {
    await ctx.reply(
      `Привет, ${ctx.from!.first_name}! Это бот свадьбы Артёма и Алины. Я помогу зарегистрироваться на неё и подготовиться к ней. Надеюсь, ты уже посетил наш сайт?`,
      {
        reply_markup: new InlineKeyboard().url(
          'Посетить сайт',
          this.webEndpoint
        ),
      }
    )
  }
}
