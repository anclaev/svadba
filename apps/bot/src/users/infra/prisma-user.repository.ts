import { Injectable } from '@nestjs/common'

import { User } from '../domain/user'
import { UserRepository } from '../domain/user.repository'

@Injectable()
export class PrismaUserRepository extends UserRepository {
  async save(user: User): Promise<User> {
    return new Promise((resolve) => resolve(user))
  }
  findById(id: string): User {
    console.log(id)
    return new User()
  }
}
