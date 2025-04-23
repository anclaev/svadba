import { GrammyArgumentsHost } from '@grammyjs/nestjs'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { SentryExceptionCaptured } from '@sentry/nestjs'

@Catch()
export class GrammyExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const grammyHost = GrammyArgumentsHost.create(host)
    const ctx = grammyHost.getContext()

    await ctx.reply(`<b>Ошибка</b>: ${exception.message}`)
  }
}
