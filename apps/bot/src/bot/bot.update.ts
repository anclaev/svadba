import { UseFilters, UseInterceptors } from '@nestjs/common';
import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { BOT_NAME, COMMANDS, SCENES } from './bot.constants';
import { BotFilter } from './bot.filter';
import { BotInterceptor } from './bot.interceptor';
import { Context } from './bot.interface';
import { BotService } from './bot.service';

@Update()
@UseInterceptors(BotInterceptor)
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    // private readonly userService: UserService,
    // private readonly orderService: OrderService
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    // const createUserDto = createUserDtoFactory(ctx.from);
    // await this.userService.createOrUpdate(createUserDto);
    ctx.session.messageId = undefined;

    await this.botService.start(ctx);
    return;
  }

  @Action(COMMANDS.ADMIN)
  async onAdminAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SCENES.ADMIN);
    return;
  }
}
