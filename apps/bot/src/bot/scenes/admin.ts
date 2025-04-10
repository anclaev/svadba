import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';

import { COMMANDS, SCENES } from '../bot.constants';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';

@Scene(SCENES.ADMIN)
export class AdminScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    return await this.botService.admin(ctx);
  }

  @Action(COMMANDS.LINKS)
  async onLinkAction(@Ctx() ctx: Context) {
    return await ctx.scene.enter(SCENES.ADMIN_LINKS);
  }

  @Action(COMMANDS.MAIN_MENU)
  async onMainMenuAction(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    return;
  }
}
