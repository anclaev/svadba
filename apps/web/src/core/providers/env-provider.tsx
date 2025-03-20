'use client'
import { createContext, useEffect, useState } from 'react'

import { INITIAL_ENV } from '@/core//constants/initial-env'
import { Env } from '@/core/schemes/env-schema'
import { getPublicEnv } from '@/core/utils/get-public-env'

export const EnvContext = createContext<Env>(INITIAL_ENV)

export const EnvProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [env, setEnv] = useState<Env>(INITIAL_ENV)

  useEffect(() => {
    getPublicEnv().then((env) => {
      setEnv(env)
    })
  }, [])
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}
