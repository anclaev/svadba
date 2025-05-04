'use client'

import { FC } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export type AuthFormProps = {
  className?: string
  defaultValue?: 'sign-up' | 'sign-in'
  redirectUrl?: string
}

export const AuthForm: FC<AuthFormProps> = ({
  className = '',
  defaultValue = 'sign-in',
  redirectUrl,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      {process.env.NEXT_PUBLIC_ALLOWED_SIGN_UP === 'true' && (
        <TabsList className="grid w-full grid-cols-2 mb-2.5 mt-2 select-none">
          <TabsTrigger value="sign-in">Вход</TabsTrigger>
          {<TabsTrigger value="sign-up">Регистрация</TabsTrigger>}
        </TabsList>
      )}
      <TabsContent value="sign-in">
        <SignInForm redirectUrl={redirectUrl} />
      </TabsContent>
      {process.env.NEXT_PUBLIC_ALLOWED_SIGN_UP === 'true' && (
        <TabsContent value="sign-up">
          <SignUpForm redirectUrl={redirectUrl} />
        </TabsContent>
      )}
    </Tabs>
  )
}
