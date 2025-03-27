import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common"
import { IReqWithUser } from "#/auth/infra/interfaces"
import { UserRole } from "#prisma"

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
