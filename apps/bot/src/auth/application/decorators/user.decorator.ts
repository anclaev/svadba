import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { IReqWithUser } from "#/auth/infra/interfaces"

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return (request as IReqWithUser).user
  },
)
