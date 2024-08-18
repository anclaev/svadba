import { LockFilledIcon, MailFilledIcon } from '@nextui-org/shared-icons'
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
          size='sm'
          endContent={
            <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
          }
          label='Электронная почта'
          variant='bordered'
        />
        <Input
          size='sm'
          endContent={
            <LockFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
          }
          label='Пароль'
          placeholder='Введите ваш пароль'
          type='password'
          variant='bordered'
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
