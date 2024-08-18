'use client'

import { Tooltip } from '@nextui-org/tooltip'
import { FC, useState } from 'react'

import { WithChildren, WithClass } from '@interfaces/props'

import './LoginButton.css'

type LoginButtonFC = FC<WithChildren & WithClass>

const LoginButton: LoginButtonFC = ({ className, children }) => {
  const [clicked, setClicked] = useState<boolean>(false)

  return (
    <Tooltip content='Стать гостем' delay={300}>
      <button
        className={`login-btn ${clicked ? 'login-btn--clicked' : ''} active:display ${className ?? ''}`}
        onClick={() => setClicked(true)}
        onAnimationEnd={() => setClicked(false)}
      >
        <div className='login-icon'></div>
        {children}
      </button>
    </Tooltip>
  )
}

export default LoginButton
