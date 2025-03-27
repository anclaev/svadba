import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { UserRole } from "#prisma"

import { RolesGuard } from "../guards/roles.guard"

export const Roles = (roles?: UserRole[]) =>
  applyDecorators(SetMetadata("roles", roles), UseGuards(RolesGuard(roles)))
