'use client'
import { createContext, useEffect, useState } from 'react'

// import { getPublicEnv } from '@/core/utils/env'

import { INITIAL_ENV } from '@/core/constants/env'

import { Env } from '@/core/schemes/env-schema'

export const EnvContext = createContext<Env>(INITIAL_ENV)

export const EnvProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [env] = useState<Env>(INITIAL_ENV)

  useEffect(() => {
    // getPublicEnv().then((env) => {
    //   setEnv(env)
    // })
  }, [])
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}
