import { User } from './user'

export abstract class UserRepository {
  abstract save(user: User): Promise<User>
  abstract findById(id: string): User
}
