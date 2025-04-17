'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Separator } from '@/shared/ui/separator'

import {
  SignUpFormSchema,
  SignUpFormValues,
} from '@/core/schemes/sign-up-form-schema'

import { registerUser } from '@/core/actions/registerUser'
import { useAuthStore } from '@/core/providers/auth-store-provider'
import { useDialogStore } from '@/core/providers/dialog-store-provider'

import { translit } from '@/core/utils/translit'

type SignUpFormProps = {
  className?: string
  redirectUrl?: string
}

export const SignUpForm: FC<SignUpFormProps> = ({
  className = '',
  redirectUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const closeLogin = useDialogStore((store) => store.closeLogin)
  const setUser = useAuthStore((store) => store.setUser)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
      name: '',
      side: 'GROOM',
      role: 'GUEST',
    },
  })

  const { errors } = form.formState

  const watchName = form.watch('name')

  useEffect(() => {
    if (watchName.trim().length > 0) {
      form.setValue('login', translit(watchName).replaceAll(' ', ''))
    }
  }, [watchName, form])

  async function onSubmit(values: SignUpFormValues) {
    setLoading(true)
    const res = await registerUser(values)
    setLoading(false)

    const { user, error } = res

    if (error) {
      toast(error.message)
      form.resetField('login')
      form.resetField('password')
      form.resetField('confirmPassword')
      return
    }

    setUser(user!)

    closeLogin()

    if (redirectUrl) {
      router.push(redirectUrl)
    }

    toast(
      <div>
        <p>Добро пожаловать, {user!.name}!</p>
        <p>Ожидайте подтверждения вашего аккаунта</p>
      </div>,
      {
        className: 'flex flex-col width-auto',
        duration: 15000,
        closeButton: true,
      }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Как вас зовут?</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Леди Гага" />
              </FormControl>
              {errors.name && <Label>{errors.name.message}</Label>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="side"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваша сторона</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Сторона" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GROOM">Жених (Артём)</SelectItem>
                  <SelectItem value="BRIDE">Невеста (Алина)</SelectItem>
                </SelectContent>
              </Select>
              {errors.side && <Label>{errors.side.message}</Label>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Кем вы приходитесь</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Роль" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GUEST">Гость</SelectItem>
                  <SelectItem value="CLOSE">Близкий</SelectItem>
                  <SelectItem value="PARENT">Родственник</SelectItem>
                </SelectContent>
              </Select>
              {errors.side && <Label>{errors.side.message}</Label>}
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш логин для входа</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              {errors.confirmPassword && (
                <Label>{errors.confirmPassword.message}</Label>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer float-right">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
      </form>
    </Form>
  )
}
