import { UserRole } from '#prisma'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { JwtAuthGuard, RolesGuard } from '#/auth/api'

export const Auth = (roles?: UserRole[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard(roles))
  )
