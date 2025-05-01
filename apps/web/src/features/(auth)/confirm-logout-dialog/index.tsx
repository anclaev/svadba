'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logoutUser } from '@/core/actions/(auth)'
import { useAuthStore } from '@/core/providers/auth-store-provider'

import { ConfirmDialog } from '@/shared/confirm-dialog'

export const ConfirmLogoutDialog = () => {
  const clearUser = useAuthStore((store) => store.clearUser)
  const router = useRouter()

  const handleLogout = async () => {
    const res = await logoutUser()

    if (!res) {
      return
    }

    toast('Вы вышли из системы.')
    clearUser()
    router.push('/')
  }

  return (
    <ConfirmDialog
      title="Выход из системы"
      description="Вы уверены, что хотите выйти?"
      cancel="Нет, я передумал"
      action="Да, конечно!"
      handleAction={handleLogout}
    />
  )
}
