import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';

import { COMMANDS, SCENES } from '../bot.constants';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';

@Scene(SCENES.ADMIN_LINKS_LIST)
export class AdminLinksListScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    // const links = await this.queryBus.execute(
    //   new GetSocialLinksQuery({ size: 100 }),
    // );
    //
    // return await this.botService.linksList(ctx, links.data, links.meta.total);
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SCENES.ADMIN_LINKS);
    return;
  }

  @Action(COMMANDS.MAIN_MENU)
  async onMainMenuAction(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    return;
  }
}
