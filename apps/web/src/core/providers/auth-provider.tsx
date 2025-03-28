'use client'

import { ReactNode, useEffect } from 'react'
import { toast } from 'sonner'

import { isNull } from '../utils/funcs'

import { getProfile } from '../actions/getProfile'

import { useAuthStore } from './auth-store-provider'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { signIn, startLoading, stopLoading } = useAuthStore((store) => store)

  useEffect(() => {
    const fetchProfile = async () => {
      startLoading()
      const profile = await getProfile()

      if (isNull(profile)) {
        return
      }

      if (profile.message) {
        toast(profile.message)
      }

      signIn(profile)
      stopLoading()
    }

    fetchProfile()
  }, [])

  return children
}
