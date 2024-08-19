import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { FC } from 'react'

import { LoginFormInput } from '@components/LoginForm/LoginFormInput'

import useInput from '@hooks/useInput'

export const SignUpForm: FC = () => {
  const nameInput = useInput('')
  const emailInput = useInput('')
  const passwordInput = useInput('')

  return (
    <form>
      <ModalBody>
        <LoginFormInput {...nameInput} type='text' label='Как вас зовут?' />
        <LoginFormInput
          {...emailInput}
          type='email'
          label='Ваша электронная почта'
        />
        <LoginFormInput
          {...passwordInput}
          type='password'
          label='Ваш пароль'
          description='Может быть от 5 до 20 символов'
        />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onPress={() => {}}>
          Далее
        </Button>
      </ModalFooter>
    </form>
  )
}
