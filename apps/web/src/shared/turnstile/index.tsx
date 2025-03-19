import { Turnstile as NextTurnstile } from 'next-turnstile'
import { useCallback } from 'react'

import { useEnv } from '@/core/hooks/use-env'

import type { TurnsitleComponent } from './types'

import './index.css'

export const Turnstile: TurnsitleComponent = ({ setStatus }) => {
  const env = useEnv()

  const setErrorCallback = useCallback(() => {
    setStatus('error')
  }, [setStatus])

  const setSuccessCallback = useCallback(() => {
    setStatus('success')
  }, [setStatus])

  const setExpiredCallback = useCallback(() => {
    setStatus('expired')
  }, [setStatus])

  const setRequiredCallback = useCallback(() => {
    setStatus('required')
  }, [setStatus])

  return (
    <NextTurnstile
      siteKey={env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
      retry="auto"
      refreshExpired="auto"
      sandbox={process.env.NODE_ENV === 'development'}
      onError={setErrorCallback}
      onVerify={setSuccessCallback}
      onExpire={setExpiredCallback}
      onLoad={setRequiredCallback}
      theme="light"
      size="normal"
    />
  )
}
