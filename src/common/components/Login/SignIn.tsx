import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { FC } from 'react'

export const SignInForm: FC = () => {
  return (
    <form>
      <ModalBody>
        <Input
          autoFocus
          size='md'
          label='Электронная почта'
          variant='bordered'
          type='email'
        />
        <Input size='md' label='Пароль' type='password' variant='bordered' />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onPress={() => {}}>
          Далее
        </Button>
      </ModalFooter>
    </form>
  )
}
