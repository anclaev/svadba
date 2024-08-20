import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { FC } from 'react'

import { AuthFormInput } from '@components/AuthForm'

import useInput from '@hooks/useInput'

import { IsModalProps, WithClick } from '@interfaces/props'
import { InputOptions } from '@interfaces/types'

type AuthSignInFormBody = {
  email: InputOptions
  password: InputOptions
}

const Body: FC<AuthSignInFormBody> = ({ email, password }) => (
  <>
    <AuthFormInput {...email} type='email' label='Электронная почта' />
    <AuthFormInput {...password} type='password' label='Пароль' />
  </>
)

const Footer: FC<WithClick> = ({ onClick }) => (
  <Button color='primary' onClick={onClick}>
    Далее
  </Button>
)
export const AuthSignInForm: FC<IsModalProps> = ({ isModal = false }) => {
  const email = useInput('')
  const password = useInput('')

  return (
    <form>
      {isModal ? (
        <>
          <ModalBody>
            <Body email={email} password={password} />
          </ModalBody>
          <ModalFooter>
            <Footer />
          </ModalFooter>
        </>
      ) : (
        <>
          <Body email={email} password={password} />
          <Footer />
        </>
      )}
    </form>
  )
}
