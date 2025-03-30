import { ValueObject } from 'ddd-base'

import type { ICredentialsProps } from '../interfaces'

export class Credentials extends ValueObject<ICredentialsProps> {
  constructor(props: ICredentialsProps) {
    super(props)
  }

  static create(version: number) {
    return new Credentials({ version })
  }

  static fromRaw(props: ICredentialsProps): Credentials {
    return new Credentials(props)
  }
}
