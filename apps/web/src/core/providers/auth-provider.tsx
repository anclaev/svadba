'use client'

import { ReactNode, useEffect } from 'react'
import { toast } from 'sonner'

import { isNull } from '@/core/utils'

import { useAuthStore } from '@/core/providers/auth-store-provider'

import { getProfile } from '@/core/actions/getProfile'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, startLoading, stopLoading } = useAuthStore((store) => store)

  useEffect(() => {
    const authorize = async () => {
      startLoading()
      const profile = await getProfile()

      if (isNull(profile)) {
        stopLoading()
        return
      }

      if (profile.error) {
        toast(profile.error.message)
        stopLoading()
        return
      }

      setUser(profile.user!)
      stopLoading()
    }

    authorize()
  }, [])

  return children
}
