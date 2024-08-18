import { ModalBody, ModalFooter } from '@nextui-org/modal'
import { LockFilledIcon } from '@nextui-org/shared-icons'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { FC } from 'react'

export const SignUpForm: FC = () => {
  return (
    <form>
      <ModalBody>
        <Input autoFocus size='sm' label='Как вас зовут?' variant='bordered' />
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
