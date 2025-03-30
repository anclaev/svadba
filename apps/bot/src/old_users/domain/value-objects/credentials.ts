import { JsonValue } from '@prisma/client/runtime/library'

import type { Credentials as CredentialsType } from '../../infra/types'

export class Credentials {
  public version: number
  private passwordUpdatedAt: Date | null = null

  private lastPassword: string | null = null

  constructor(version: number) {
    this.version = version
  }

  public set(lastPassword: string | null, passwordUpdatedAt: Date | null) {
    this.lastPassword = lastPassword
    this.passwordUpdatedAt = passwordUpdatedAt
  }

  public static fromModel(data: CredentialsType) {
    const credentials = new Credentials(data.version)
    credentials.set(data.lastPassword, data.passwordUpdatedAt)
    return credentials
  }

  public toModel(): JsonValue {
    return {
      version: this.version,
      lastPassword: this.lastPassword,
      passwordUpdatedAt: this.passwordUpdatedAt
        ? this.passwordUpdatedAt.toISOString()
        : null,
    }
  }
}
