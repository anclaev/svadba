import { UserRole } from '#prisma'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'

export const Auth = (roles?: UserRole[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard(roles))
  )
