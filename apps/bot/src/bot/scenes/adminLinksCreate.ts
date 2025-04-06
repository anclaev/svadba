import { CommandBus } from '@nestjs/cqrs'
import { Action, Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { StringSchema, UrlSchema } from '#/common/schemes'

import { BUTTONS, COMMANDS, SCENES } from '../bot.constants'
import { Context } from '../bot.interface'
import { BotService } from '../bot.service'

@Scene(SCENES.ADMIN_LINKS_CREATE)
export class AdminLinksCreateScene {
  constructor(
    private readonly botService: BotService,
    private readonly commandBus: CommandBus
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await this.botService.linksCreateStart(ctx)
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SCENES.ADMIN_LINKS)
    return
  }

  @Action(COMMANDS.MAIN_MENU)
  async onMainMenuAction(@Ctx() ctx: Context) {
    await this.botService.start(ctx)
    return
  }

  @Action(COMMANDS.YES)
  async onConfirmLink(@Ctx() ctx: Context) {
    if (
      ctx.session.data.title &&
      ctx.session.data.href &&
      ctx.session.data.alias
    ) {
      await ctx.reply('aef')
      // const res = await this.commandBus.execute(
      //   new CreateSocialLinkCommand({
      //     alias: ctx.session.data.alias,
      //     title: ctx.session.data.title,
      //     href: ctx.session.data.href,
      //   })
      // )
    }
    return
  }

  @Action(COMMANDS.NO)
  async onCancelLink(@Ctx() ctx: Context) {
    ctx.session.type = null
    await ctx.scene.reenter()
    return
  }

  @On('text')
  async onText(@Message('text') message: string, @Ctx() ctx: Context) {
    const buttons = [[BUTTONS.BACK]]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)

    if (ctx.session.type === 'CREATE_LINK_TITLE') {
      if (!StringSchema.safeParse(message.trim()).success) {
        ctx.reply('Некорректное название.')

        await this.botService.linksCreateStart(ctx)
        return
      }

      ctx.session.data = {}

      ctx.session.data.title = message.trim()
      ctx.session.type = 'CREATE_LINK_ALIAS'

      await ctx.reply('Отправьте мне алиас ссылки.', inlineKeyboard)
      return
    }

    if (ctx.session.type === 'CREATE_LINK_ALIAS') {
      if (!StringSchema.safeParse(message.trim()).success) {
        ctx.reply('Некорректный алиас ссылки.')

        await ctx.reply('Отправьте мне алиас ссылки.', inlineKeyboard)
        return
      }

      ctx.session.data.alias = message.trim()
      ctx.session.type = 'CREATE_LINK_HREF'

      await ctx.reply('Отправьте мне ссылку.', inlineKeyboard)
      return
    }

    if (ctx.session.type === 'CREATE_LINK_HREF') {
      if (!UrlSchema.safeParse(message).success) {
        ctx.reply('Некорректная ссылка.')

        ctx.session.type = null
        await this.botService.linksCreateStart(ctx)
        return
      }

      ctx.session.data.href = message.trim()
      ctx.session.type = 'CREATE_LINK_CONFIRM'

      await ctx.reply(
        `Проверьте готовую ссылку:\n\nНазвание: ${ctx.session.data.title}\nАлиас: ${ctx.session.data.alias}\nСсылка: ${ctx.session.data.href}\n\nВсё верно?`,
        Markup.inlineKeyboard([BUTTONS.YES, BUTTONS.NO])
      )
      return
    }
  }
}
