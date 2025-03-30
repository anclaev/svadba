import { User } from './user'

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
  abstract findByLogin(login: string): Promise<User | null>
  // abstract save(user: User): Promise<User>
}
