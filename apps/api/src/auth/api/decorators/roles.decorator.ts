import { UserRole } from '#prisma'
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { RolesGuard } from '#/auth/api'

export const Roles = (roles?: UserRole[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard(roles)))
