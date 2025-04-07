export namespace user {
  export const PACKAGE_NAME = 'user'

  export interface User {
    id: string
    role: string
    login: string
    name: string
    is_telegram_verified: boolean
    guest_role: string
    guest_status: string
    guest_side: string
    created_at: string
    telegram_id?: string
  }
}
