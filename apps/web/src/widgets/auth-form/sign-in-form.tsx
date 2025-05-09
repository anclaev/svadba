'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
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

import { SignInFormSchema, SignInFormValues } from '@/core/schemes/(auth)'

import trackedAuthorizeUser from '@/core/actions/(auth)/authorizeUser'

import { useAuthStore } from '@/core/providers/auth-store-provider'
import { useDialogStore } from '@/core/providers/dialog-store-provider'

type SignInFormProps = {
  redirectUrl?: string
}

export const SignInForm: FC<SignInFormProps> = ({ redirectUrl }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const closeLogin = useDialogStore((store) => store.closeLogin)
  const setUser = useAuthStore((store) => store.setUser)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const { errors } = form.formState

  async function onSubmit(values: SignInFormValues) {
    setLoading(true)
    const res = await trackedAuthorizeUser(values)
    setLoading(false)

    const { user, error } = res

    if (error) {
      toast(error.message)
      form.resetField('password')
      return
    }

    setUser(user!)

    closeLogin()

    if (user!.status === 'CREATED') {
      toast(
        <div>
          <p>Добро пожаловать, {user!.name}!</p>
          <p>Ваш аккаунт ожидает подтверждения</p>
        </div>,
        {
          className: 'flex flex-col width-auto',
          duration: 60000,
          closeButton: true,
        }
      )
    }

    if (user!.status === 'BLOCKED') {
      toast(
        <div>
          <p>Добро пожаловать, {user!.name}!</p>
          <p>Ваш аккаунт заблокирован.</p>
        </div>,
        {
          className: 'flex flex-col width-auto',
          duration: 60000,
          closeButton: true,
        }
      )
      return
    }

    toast(`Добро пожаловать, ${user!.name}!`, {
      cancel: {
        label: 'Перейти в кабинет гостя',
        onClick: () => {
          router.push('/-')
        },
      },
      className: 'flex flex-col width-auto',
      duration: 60000,
      closeButton: true,
    })

    if (redirectUrl) {
      router.push(redirectUrl)
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
        <Button type="submit" className="cursor-pointer float-right">
          {loading ? <Loader2 className="animate-spin" /> : 'Войти'}
        </Button>
      </form>
    </Form>
  )
}
