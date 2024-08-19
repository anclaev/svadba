import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { FC } from 'react'

import { LoginFormInput } from '@components/LoginForm/LoginFormInput'

import useInput from '@hooks/useInput'

export const SignInForm: FC = () => {
  const emailInput = useInput('')
  const passwordInput = useInput('')

  return (
    <form>
      <ModalBody>
        <LoginFormInput
          {...emailInput}
          type='email'
          label='Электронная почта'
        />
        <LoginFormInput {...passwordInput} type='password' label='Пароль' />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onPress={() => {}}>
          Далее
        </Button>
      </ModalFooter>
    </form>
  )
}
