'use client'

import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { FC, useCallback, useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import dynamic from 'next/dynamic'

import { WithChildren, WithClass } from '@interfaces/props'

import './AuthButton.css'

const DynamicAuthForm = dynamic(() =>
  import('src/common/components/AuthForm').then((m) => m.AuthForm)
)

export const AuthButton: FC<WithClass & WithChildren> = ({
  className,
  children,
}) => {
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
          className={`auth-btn ${clicked ? 'authn-btn--clicked' : ''} active:display ${className ?? ''}`}
          onClick={() => handleOpenModal()}
          onAnimationEnd={() => setClicked(false)}
        >
          <div className='auth-icon'></div>
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
              <DynamicAuthForm isModal={true} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
