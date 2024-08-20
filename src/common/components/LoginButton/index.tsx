'use client'

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { FC, useCallback, useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import dynamic from 'next/dynamic'

import { WithChildren, WithClass } from '@interfaces/props'

import './LoginButton.css'

const DynamicLoginForm = dynamic(() =>
  import('src/common/components/LoginForm').then((m) => m.LoginForm)
)

// eslint-disable-next-line no-undef
const LoginButton: FC<WithClass & WithChildren> = ({ className, children }) => {
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
        size='full'
        placement='bottom-center'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          footer: ['py-2 justify-center'],
        }}
      >
        <ModalContent>
          {() => (
            <div className='flex items-center justify-center flex-col h-full'>
              <DynamicLoginForm />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginButton
