import { Controller, Get } from '@nestjs/common'

/**
 * Базовый контроллер приложения
 */
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!'
  }
}
