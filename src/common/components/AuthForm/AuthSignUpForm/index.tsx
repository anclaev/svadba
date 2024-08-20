import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { FC } from 'react'

import { AuthFormInput } from '@components/AuthForm'

import useInput from '@hooks/useInput'

import { IsModalProps, WithClick } from '@interfaces/props'
import { InputOptions } from '@interfaces/types'

type AuthSignUpFormBody = {
  name: InputOptions
  email: InputOptions
  password: InputOptions
}

const Body: FC<AuthSignUpFormBody> = (props) => (
  <>
    <AuthFormInput {...props.name} type='text' label='Как вас зовут?' />
    <AuthFormInput
      {...props.email}
      type='email'
      label='Ваша электронная почта'
    />
    <AuthFormInput
      {...props.password}
      type='password'
      label='Ваш пароль'
      description='Может быть от 5 до 20 символов'
    />
  </>
)

const Footer: FC<WithClick> = ({ onClick }) => (
  <Button color='primary' onClick={onClick}>
    Далее
  </Button>
)

export const AuthSignUpForm: FC<IsModalProps> = ({ isModal = false }) => {
  const name = useInput('')
  const email = useInput('')
  const password = useInput('')

  return (
    <form>
      {isModal ? (
        <>
          <ModalBody>
            <Body name={name} email={email} password={password} />
          </ModalBody>
          <ModalFooter>
            <Footer />
          </ModalFooter>
        </>
      ) : (
        <>
          <Body name={name} email={email} password={password} />
          <Footer />
        </>
      )}
    </form>
  )
}
