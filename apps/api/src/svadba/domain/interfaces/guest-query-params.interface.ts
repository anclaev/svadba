import { GuestRole, GuestSide } from '#prisma'

import { IUserQueryParams } from '#/user/domain'

export interface IGuestQueryParams extends IUserQueryParams {
  side: GuestSide
  guestRole: GuestRole
}
