'use client'

import { ElementRef, useEffect, useRef } from 'react'
import * as VKID from '@vkid/sdk'

const oneTap = new VKID.OneTap()

const VKOneTap = () => {
  const ref = useRef<ElementRef<HTMLDivElement> | null>(null)

  useEffect(() => {
    if (ref.current) {
      VKID.Config.init({
        app: process.env.NEXT_PUBLIC_AUTH_VK_ID,
        redirectUrl: process.env.NEXT_PUBLIC_AUTH_VK_REDIRECT_URL,
        state: 'dj29fnsadjsd82f249k293c139j1kd3',
        mode: VKID.ConfigAuthMode.Redirect,
      })

      oneTap.render({
        container: ref.current as HTMLElement,
        scheme: VKID.Scheme.LIGHT,
        lang: VKID.Languages.RUS,
        skin: VKID.OneTapSkin.Secondary,
      })
    }
  }, [])

  return <div ref={ref}></div>
}

export default VKOneTap
