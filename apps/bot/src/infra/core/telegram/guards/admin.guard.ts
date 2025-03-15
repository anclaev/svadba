// @ts-nocheck
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Context } from '#infra/core/telegram/interfaces/context.interface'

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_IDS = ['6035210835']

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context)
    const { from } = ctx.getContext<Context>()

    const isAdmin = this.ADMIN_IDS.includes(String(from.id))
    if (!isAdmin) {
      throw new TelegrafException('Вы не администратор 😡')
    }

    return true
  }
}
