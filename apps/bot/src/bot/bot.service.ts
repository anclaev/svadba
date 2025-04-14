import { Bot } from 'grammy'

export class BotService extends Bot {
  private static _instance: BotService

  private constructor(token: string) {
    super(token)
  }

  public static getInstance(token: string) {
    if (this._instance) {
      return this._instance
    }

    this._instance = new BotService(token)
    return this._instance
  }
}
