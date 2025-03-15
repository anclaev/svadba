import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')

    const start = Date.now()
    return next
      .handle()
      .pipe(tap(() => console.log(`Время ответа: ${Date.now() - start}ms`)))
  }
}
