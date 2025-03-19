import { Turnstile } from 'next-turnstile'

import type { TurnsitleWidgetComponent } from '@/types/turnstile'
import React, { useCallback } from 'react'

import './index.css'

export const TurnstileWidget: TurnsitleWidgetComponent = ({ setStatus }) => {
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
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
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
