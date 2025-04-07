import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';

import { COMMANDS, SCENES } from '../bot.constants';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';

@Scene(SCENES.ADMIN_LINKS)
export class AdminLinksScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    return await this.botService.links(ctx);
  }

  // @Action(COMMANDS.LINKS_LIST)
  // async onLinksListAction(@Ctx() ctx: Context) {
  //   return await ctx.scene.enter(SCENES.ADMIN_LINKS_LIST)
  // }
  //
  // @Action(COMMANDS.LINKS_CREATE)
  // async onLinksCreateAction(@Ctx() ctx: Context) {
  //   return await ctx.scene.enter(SCENES.ADMIN_LINKS_CREATE)
  // }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SCENES.ADMIN);
    return;
  }
}
