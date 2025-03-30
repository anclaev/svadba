import { JsonObject } from '@prisma/client/runtime/library'

import { Guest } from '#/user/domain/Guest'

import type { IGuestRaw } from '#/user/domain/interfaces'
import type { GuestModel } from '../interfaces'

export class GuestMapper {
  static toTable(domain: Guest): GuestModel {
    return {
      id: domain.id ? domain.id.toString() : undefined,
      userId: domain.userId ? domain.userId.toString() : undefined,
      role: domain.role,
      side: domain.side,
      answers: domain.answers,
      createdAt: domain.createdAt ? domain.createdAt : undefined,
    }
  }

  static toDomain(table: GuestModel): Guest {
    const guestRaw: IGuestRaw = {
      id: table.id,
      side: table.side,
      userId: table.id,
      role: table.role!,
      answers: table.answers as JsonObject,
      createdAt: new Date(table.createdAt!),
    }

    return Guest.fromRaw(guestRaw)
  }
}
