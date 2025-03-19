'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { TurnstileWidget } from '../widgets/turnstile-widget'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { SignInFormSchema } from './schema'

import type { TurnstileStatus } from '@/types/turnstile'

export const AuthSignInForm = () => {
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>('required')

  const [turnstileError, setTurnstileError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const { errors } = form.formState

  function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    console.log(values)

    if (turnstileStatus !== 'success') {
      setTurnstileError('Пожалуйста, подтвердите, что вы человек')
      return
    } else {
      setTurnstileError(null)
    }
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

        <TurnstileWidget setStatus={setTurnstileStatus} />
        {turnstileError && <Label>{turnstileError}</Label>}

        <Button type="submit" className="cursor-pointer float-right">
          Войти
        </Button>
      </form>
    </Form>
  )
}
