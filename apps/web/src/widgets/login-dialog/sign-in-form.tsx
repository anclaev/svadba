'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

import { useAuthStore } from '@/core/providers/auth-store-provider'
import { useDialogStore } from '@/core/providers/dialog-store-provider'

import { TURNSTILE_ERROR } from '@/core/constants/turnstile-error'
import { Turnstile } from '@/shared/turnstile'

import { UserModel } from '@/core/models/user.model'

import type { TurnstileStatus } from '@/shared/turnstile/types'

export const SignInForm = () => {
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>('required')

  const [turnstileError, setTurnstileError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const closeLogin = useDialogStore((store) => store.closeLogin)
  const signIn = useAuthStore((store) => store.signIn)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const { errors } = form.formState

  async function onSubmit(values: SignInFormValues) {
    if (turnstileStatus !== 'success') {
      setTurnstileError(TURNSTILE_ERROR)
      return
    } else {
      setTurnstileError(null)
    }

    setLoading(true)
    const res = await login(values)
    setLoading(false)

    if (res.message) {
      toast(res.message)
      form.resetField('password')
      return
    }

    toast(`Добро пожаловать, ${res.name}!`)
    signIn(res as UserModel)
    closeLogin()
    router.push('/my')
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
          {loading ? <Loader2 className="animate-spin" /> : 'Войти'}
        </Button>
      </form>
    </Form>
  )
}
