import { ValueObject } from 'ddd-base'

import { ICredentialsProps } from '#/user/domain'

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
