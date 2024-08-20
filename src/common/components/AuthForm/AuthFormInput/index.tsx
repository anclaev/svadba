import { Input } from '@nextui-org/input'
import { FC } from 'react'

import { InputProps } from '@interfaces/props'

export const AuthFormInput: FC<InputProps> = (props) => {
  switch (props.type) {
    case 'password': {
      return (
        <Input
          {...props}
          autoComplete='current-password'
          size='md'
          variant='bordered'
        />
      )
    }

    case 'email': {
      return (
        <Input {...props} autoComplete='email' size='md' variant='bordered' />
      )
    }

    default: {
      return <Input {...props} size='md' variant='bordered' />
    }
  }
}
