import { ExtraEditMessageText } from 'telegraf/typings/telegram-types'
import { BOT_ADMIN_IDS } from './bot.constants'
import { Context } from './bot.interface'

export const replyOrEdit = async (
  ctx: Context,
  text: string,
  extra: ExtraEditMessageText
) => {
  const messageId = ctx.update.callback_query?.message!.message_id
    ? ctx.update.callback_query?.message.message_id
    : ctx.session.messageId
  const chatId = ctx.from!.id
  if (messageId) {
    return await ctx.telegram.editMessageText(
      chatId,
      messageId,
      undefined,
      text,
      extra
    )
  }
  const reply = await ctx.replyWithHTML(text, extra)
  ctx.session.messageId = reply.message_id
  return
}

export const addPrevScene = (ctx: Context, scene: string) => {
  const state = ctx.scene.session.state
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  state.prevScene ? state.prevScene.push(scene) : (state.prevScene = [scene])
  return state
}

export const backCallback = (ctx: Context, scene: string) => {
  const state = ctx.scene.session.state
  const prevScene = state.prevScene?.pop() || scene

  return { scene: prevScene, state }
}

export const isAdmin = ({ from }: Context) => {
  return BOT_ADMIN_IDS.includes(String(from!.id))
}
