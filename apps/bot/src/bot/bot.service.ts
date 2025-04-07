import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectBot } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { social_link } from '@repo/shared';

import { BOT_NAME, BUTTONS, TEXT } from './bot.constants';
import { Context } from './bot.interface';
import { isAdmin, replyOrEdit } from './bot.utils';

@Injectable()
export class BotService implements OnModuleInit {
  private socialLinkServiceClient: social_link.SocialLinkServiceClient;

  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
    @Inject(social_link.PACKAGE_NAME)
    private grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.socialLinkServiceClient =
      this.grpcClient.getService<social_link.SocialLinkServiceClient>(
        'SocialLinkService',
      );
  }

  async sendBaseMessage(message: any) {
    console.log(message);
    await this.bot.telegram.sendMessage(message.chatId, message.text);
    return;
  }

  async start(ctx: Context) {
    const buttons = [BUTTONS.ABOUT];

    if (isAdmin(ctx)) {
      buttons.push(BUTTONS.ADMIN);
    }

    const inlineButtons = Markup.inlineKeyboard(buttons, { columns: 3 });

    await replyOrEdit(
      ctx,
      '👋 Привет! Это бот для регистрации на нашу свадьбу.\n\nЯ - Эль, цифровая дочь Артёма и Алины, с удовольствием помогу вам в этом!',
      inlineButtons,
    );
    return;
  }

  async admin(ctx: Context) {
    if (!isAdmin(ctx)) {
      return await this.unauthorized(ctx);
    }

    const buttons = [BUTTONS.LINKS, BUTTONS.GUESTS, BUTTONS.MAIN_MENU];

    const inlineKeyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
    await replyOrEdit(ctx, TEXT.SELECT, inlineKeyboard);
    return;
  }

  async links(ctx: Context) {
    const buttons = [BUTTONS.LINKS_LIST, BUTTONS.LINKS_CREATE, BUTTONS.BACK];

    const inlineKeyboard = Markup.inlineKeyboard(buttons, { columns: 1 });
    await replyOrEdit(ctx, TEXT.SELECT, inlineKeyboard);
    return;
  }

  // async linksList(ctx: Context, links: SocialLink[], total: number) {
  //   const buttons = [[BUTTONS.BACK], [BUTTONS.MAIN_MENU]]
  //   const inlineKeyboard = Markup.inlineKeyboard(buttons)
  //   await replyOrEdit(ctx, TEXT.LINKS(links, total), inlineKeyboard)
  // }

  async linksCreateStart(ctx: Context) {
    const buttons = [[BUTTONS.BACK], [BUTTONS.MAIN_MENU]];
    const inlineKeyboard = Markup.inlineKeyboard(buttons);

    ctx.session.type = 'CREATE_LINK_TITLE';

    await replyOrEdit(ctx, 'Отправьте мне название ссылки.', inlineKeyboard);
  }

  // async guests(ctx: Context) {
  //   const buttons = [BUTTONS.GUESTS_LISTS, BUTTONS.BACK]

  //   const inlineKeyboard = Markup.inlineKeyboard(buttons, { columns: 1 })
  //   await replyOrEdit(ctx, TEXT.SELECT, inlineKeyboard)
  //   return
  // }

  // // async guestsList(ctx: Context) {}

  private async unauthorized(ctx: Context) {
    const buttons = [BUTTONS.MAIN_MENU];

    const inlineKeyboard = Markup.inlineKeyboard(buttons);
    await replyOrEdit(ctx, TEXT.UNAUTHORIZED, inlineKeyboard);
    return;
  }
}
