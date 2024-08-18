import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { FC } from 'react'

export const SignUpForm: FC = () => {
  return (
    <form>
      <ModalBody>
        <Input autoFocus size='md' label='Как вас зовут?' variant='bordered' />
        <Input
          autoFocus
          size='md'
          label='Ваша электронная почта'
          variant='bordered'
        />
        <Input
          size='md'
          label='Пароль'
          type='password'
          variant='bordered'
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
