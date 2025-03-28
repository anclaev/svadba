import { UserModel } from '../models/user.model'

export type AuthLoginDataDto = {
  user: UserModel
  access_token: string
  refresh_token: string
}
