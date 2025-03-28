import { Turnstile as NextTurnstile } from 'next-turnstile'
import { FC, useCallback } from 'react'

import { useEnv } from '@/core/hooks/use-env'

import './index.css'

export type TurnstileStatus = 'success' | 'error' | 'expired' | 'required'

export const Turnstile: FC<{
  setStatus: (status: TurnstileStatus) => void
  hidden?: boolean
}> = ({ setStatus, hidden }) => {
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
      className={hidden ? 'hidden' : ''}
    />
  )
}
