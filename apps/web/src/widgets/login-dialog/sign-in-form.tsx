'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import {
  SignInFormSchema,
  SignInFormValues,
} from '@/core/schemes/sign-in-form-schema'

import { login } from '@/core/actions/login'

import { TURNSTILE_ERROR } from '@/core/constants/turnstile-error'
import { Turnstile } from '@/shared/turnstile'

import type { TurnstileStatus } from '@/shared/turnstile/types'

export const SignInForm = () => {
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>('required')

  const [turnstileError, setTurnstileError] = useState<string | null>(null)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const { errors } = form.formState

  async function onSubmit(values: SignInFormValues) {
    console.log(values)

    if (turnstileStatus !== 'success') {
      setTurnstileError(TURNSTILE_ERROR)
      return
    } else {
      setTurnstileError(null)
    }

    const loginData = new FormData()

    loginData.append('login', values.login)
    loginData.append('login', values.password)

    await login(loginData)

    toast('Личный кабинет в разработке.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.login && <Label>{errors.login.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              {errors.password && <Label>{errors.password.message}</Label>}
            </FormItem>
          )}
        />

        <Turnstile setStatus={setTurnstileStatus} hidden={true} />
        {/* {turnstileError && <Label>{turnstileError}</Label>} */}

        <Button type="submit" className="cursor-pointer float-right">
          Войти
        </Button>
      </form>
    </Form>
  )
}
