'use client'

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { FC, useCallback, useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import dynamic from 'next/dynamic'

import { WithChildren, WithClass } from '@interfaces/props'

import './LoginButton.css'

type LoginButtonFC = FC<WithChildren & WithClass>

const DynamicLoginForm = dynamic(() =>
  import('@components/Login').then((m) => m.LoginForm)
)

const LoginButton: LoginButtonFC = ({ className, children }) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenModal = useCallback(() => {
    setClicked(true)
    onOpen()
  }, [onOpen])

  return (
    <>
      <Tooltip content='Стать гостем' delay={300}>
        <button
          className={`login-btn ${clicked ? 'login-btn--clicked' : ''} active:display ${className ?? ''}`}
          onClick={() => handleOpenModal()}
          onAnimationEnd={() => setClicked(false)}
        >
          <div className='login-icon'></div>
          {children}
        </button>
      </Tooltip>
      <Modal
        size='md'
        placement='bottom-center'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          footer: ['py-2 justify-center'],
        }}
      >
        <ModalContent>{() => <DynamicLoginForm />}</ModalContent>
      </Modal>
    </>
  )
}

export default LoginButton
