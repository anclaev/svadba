'use client'

import { Tab, Tabs } from '@nextui-org/tabs'
import { FC, Key, useState } from 'react'

import { SignUpForm } from '@components/SignUpForm'
import { SignInForm } from '@components/SignInForm'

import { TabState } from '@interfaces/types'

import './LoginForm.css'

export const LoginForm: FC = () => {
  const [selected, setSelected] = useState<TabState>('sign-up')

  return (
    <div className='login-form-container'>
      <Tabs
        fullWidth
        size='md'
        aria-label='Форма входа'
        classNames={{
          tabList: ['py-3 px-4'],
          cursor: ['bg-accent'],
        }}
        selectedKey={selected}
        onSelectionChange={(key: Key) => setSelected(key as TabState)}
      >
        <Tab key='sign-up' title='Хочу на свадьбу'>
          <SignUpForm />
        </Tab>
        <Tab key='sign-in' title='Я уже в системе'>
          <SignInForm />
        </Tab>
      </Tabs>
    </div>
  )
}
