import { useContext } from 'react'

import { EnvContext } from '@/core/providers/env-provider'

export const useEnv = () => {
  return useContext(EnvContext)
}
