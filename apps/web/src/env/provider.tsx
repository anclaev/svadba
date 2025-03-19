'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getPublicEnv } from './env'

import type { Env } from './schema'

const initialEnv: Env = {
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: '',
}

export const EnvContext = createContext<Env>(initialEnv)

export const EnvProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [env, setEnv] = useState<Env>(initialEnv)

  useEffect(() => {
    getPublicEnv().then((env) => {
      setEnv(env)
    })
  }, [])
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}

export const useEnv = () => {
  return useContext(EnvContext)
}
