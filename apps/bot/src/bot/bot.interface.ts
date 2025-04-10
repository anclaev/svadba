import { Context as BaseContext, Scenes } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

import { SESSION_TYPES } from './bot.constants';

export interface Context extends BaseContext {
  update: Update.CallbackQueryUpdate;
  session: SessionData;
  scene: Scenes.SceneContextScene<Context, MySceneSession>;
  match: any;
}

interface SessionData extends Scenes.SceneSession<MySceneSession> {
  messageId?: number;
  type: SESSION_TYPES | null;
  data: Record<string, string>;
}

interface MySceneSession extends Scenes.SceneSessionData {
  state: {
    prevScene?: string[];
  };
}
