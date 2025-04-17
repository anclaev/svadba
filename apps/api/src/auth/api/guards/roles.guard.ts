import { UserRole } from '#prisma'
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common'

import { IReqWithUser } from '#/auth/app'

export const RolesGuard = (roles?: UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user } = context.switchToHttp().getRequest<IReqWithUser>()

      if (roles && user.role) {
        return !!roles.find((item) => item === user.role)
      }

      return true
    }
  }

  return mixin(RoleGuardMixin)
}
