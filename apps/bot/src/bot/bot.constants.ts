import { Markup } from 'telegraf';

export const BOT_NAME = 'Elle';
export const BOT_ADMIN_IDS = ['6035210835'];

export const SCENES = {
  ADMIN: 'ADMIN',
  ADMIN_GUESTS: 'ADMIN_GUESTS',
  ADMIN_GUESTS_LIST: 'ADMIN_GUESTS_LIST',
  ADMIN_LINKS: 'ADMIN_LINKS',
  ADMIN_LINKS_LIST: 'ADMIN_LINKS_LIST',
  ADMIN_LINKS_CREATE: 'ADMIN_LINKS_CREATE',
} as const;

export const COMMANDS = {
  YES: 'YES',
  NO: 'NO',
  START: 'START',
  BACK: 'BACK',
  MAIN_MENU: 'MAIN_MENU',
  ADMIN: 'ADMIN',
  LINKS: 'LINKS',
  LINKS_LIST: 'LINKS_LIST',
  LINKS_CREATE: 'LINKS_CREATE',
  GUESTS: 'GUESTS',
  GUESTS_LIST: 'GUESTS_LIST',
} as const;

export const BUTTONS = {
  YES: Markup.button.callback('👌 Да', COMMANDS.YES),
  NO: Markup.button.callback('👎 Нет', COMMANDS.NO),
  MAIN_MENU: Markup.button.callback('🏠 Главное меню', COMMANDS.MAIN_MENU),
  BACK: Markup.button.callback('⬅ Назад', COMMANDS.BACK),
  ABOUT: Markup.button.callback('🎬 О мероприятии', COMMANDS.ADMIN),
  ADMIN: Markup.button.callback('⚙️ Управление', COMMANDS.ADMIN),
  LINKS: Markup.button.callback('🔗 Социальные ссылки', COMMANDS.LINKS),
  LINKS_LIST: Markup.button.callback('🔗 Список ссылок', COMMANDS.LINKS_LIST),
  LINKS_CREATE: Markup.button.callback(
    '➕ Добавить ссылку',
    COMMANDS.LINKS_CREATE,
  ),
  GUESTS: Markup.button.callback('👥 Гости', COMMANDS.GUESTS),
  // CREATE_GUEST: Markup.button.callback(
  //   '➕ Добавить гостя',
  //   COMMANDS.GUESTS_CREATE
  // ),
  GUESTS_LISTS: Markup.button.callback(
    '👥 Список гостей',
    COMMANDS.GUESTS_LIST,
  ),
} as const;

export const SESSION_TYPES = {
  CREATE_LINK_TITLE: 'CREATE_LINK_TITLE',
  CREATE_LINK_ALIAS: 'CREATE_LINK_ALIAS',
  CREATE_LINK_HREF: 'CREATE_LINK_HREF',
  CREATE_LINK_CONFIRM: 'CREATE_LINK_CONFIRM',
} as const;
export type SESSION_TYPES = (typeof SESSION_TYPES)[keyof typeof SESSION_TYPES];

// export const guestsTemplate = (guests: User[]): string =>
//   guests.length > 0
//     ? guests
//         .map((g) => {
//           const msg = [];
//           msg.push(`ID: ID: ${g.id}`);
//           msg.push(`Имя: ${g.name}`);
//           msg.push(`Роль:${g.role}`);
//           msg.push(`Статус: ${g.status}`);
//           msg.push(`Сторона: ${g.guest.side}`);
//           msg.push(`Тип: ${g.guest.role}`);
//           return msg.join('\n');
//         })
//         .join('\n\n')
//     : 'Гости не зарегистрированы';

// export const socialLinksTemplate = (
//   links: SocialLink[],
//   total: number,
// ): string =>
//   links.length > 0
//     ? links
//         .map((l) => {
//           const msg = [];
//           msg.push(`ID: ID: ${l.id}`);
//           msg.push(`Алиас: ${l.alias}`);
//           msg.push(`Название:${l.title}`);
//           msg.push(`Ссылка: ${l.href}`);
//           msg.push(`Иконка: ${l.icon}`);
//           return msg.join('\n');
//         })
//         .join('\n\n') + `\n\nВсего ссылок: ${total}`
//     : 'Ссылки не найдены';

export const TEXT = {
  SELECT: 'Выберите одну из страниц.',
  UNAUTHORIZED: 'Вы не администратор!',
  // GUESTS: guestsTemplate,
  // LINKS: socialLinksTemplate,
} as const;
