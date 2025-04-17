import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { IReqWithUser } from '#/auth/app'

export const AuthenticatedUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return (request as IReqWithUser).user
  }
)
