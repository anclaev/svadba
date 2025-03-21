import { GuestRole, Side } from '#prisma'

import type { GuestAnswers } from '#/users/infra/types'

export class Guest {
  private id: number | null
  public side: Side
  public role: GuestRole
  public answers: GuestAnswers
  public createdAt: Date | null

  constructor(
    side: Side,
    role?: GuestRole,
    answers?: GuestAnswers,
    createdAt?: Date
  ) {
    this.side = side
    this.role = role ?? GuestRole.GUEST
    this.answers = answers ?? {}
    this.createdAt = createdAt ?? null
  }

  public getId(): number | null {
    return this.id
  }

  private setId(id: number) {
    this.id = id
  }
}
