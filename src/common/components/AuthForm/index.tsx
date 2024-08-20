'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { FC, Key, useState } from 'react'

import { AuthSignInForm } from 'src/common/components/AuthForm/AuthSignInForm'
import { AuthSignUpForm } from 'src/common/components/AuthForm/AuthSignUpForm'
import { AuthFormInput } from '@components/AuthForm/AuthFormInput'
import { AuthButton } from '@components/AuthForm/AuthButton'

import { IsModalProps } from '@interfaces/props'
import { TabState } from '@interfaces/types'

import './AuthForm.css'

export const AuthForm: FC<IsModalProps> = ({ isModal = false }) => {
  const [selected, setSelected] = useState<TabState>('sign-up')

  return (
    <div className='auth-form-container'>
      <Tabs
        fullWidth
        size='md'
        aria-label='Авторизация'
        classNames={{
          tabList: ['py-3 px-4'],
          cursor: ['bg-accent'],
        }}
        selectedKey={selected}
        onSelectionChange={(key: Key) => setSelected(key as TabState)}
      >
        <Tab key='sign-up' title='Хочу на свадьбу'>
          <AuthSignUpForm isModal={isModal} />
        </Tab>
        <Tab key='sign-in' title='Я уже в системе'>
          <AuthSignInForm isModal={isModal} />
        </Tab>
      </Tabs>
    </div>
  )
}

export { AuthSignInForm, AuthSignUpForm, AuthFormInput, AuthButton }
