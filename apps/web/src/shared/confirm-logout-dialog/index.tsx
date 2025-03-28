'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logoutUser } from '@/core/actions/logoutUser'
import { useAuthStore } from '@/core/providers/auth-store-provider'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog'

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
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle hidden>Выход из системы</AlertDialogTitle>
        <AlertDialogDescription>
          Вы уверены, что хотите выйти?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">
          Нет, я передумал
        </AlertDialogCancel>
        <AlertDialogAction className="cursor-pointer" onClick={handleLogout}>
          Да, конечно!
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
