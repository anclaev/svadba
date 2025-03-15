import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
} from 'nestjs-telegraf'

import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { Telegraf } from 'telegraf'

import { BOT_NAME } from '#infra/core'

import { ResponseTimeInterceptor } from '#infra/core/telegram/interceptors/response-time.interceptor'
import { TelegrafExceptionFilter } from '#infra/core/telegram/filters/telegraf-exception.filter'
import { ReverseTextPipe } from '#infra/core/telegram/pipes/reverse-text.pipe'
import { Context } from '#infra/core/telegram/interfaces/context.interface'
import { AdminGuard } from '#infra/core/telegram/guards/admin.guard'

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class EchoUpdate {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe()
    return `Привет, я ${me.first_name}`
  }

  @Help()
  onHelp(): string {
    return 'Send me any text'
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge'
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string
  ): string {
    return reversedText
  }
}
