import { User } from './user'

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>
  // abstract save(user: User): Promise<User>
  // abstract findById(id: string): User
}
