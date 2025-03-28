import { UserModel } from '@/core/models/user.model'

export type ApiAuthLoginResponse = {
  user: UserModel
  access_token: string
  refresh_token: string
  refresh_token_id: string
}

export type ApiAuthRefreshResponse = {
  user: UserModel
  access_token: string
  refresh_token: string
  refresh_token_id: string
}

export type ApiAuthProfileResponse = UserModel
