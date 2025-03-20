'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

import { TURNSTILE_ERROR } from '@/core/constants/turnstile-error'
import { translit } from '@/core/utils/translit'
import { Turnstile } from '@/shared/turnstile'

import type { TurnstileStatus } from '@/shared/turnstile/types'

export const SignUpForm: FC<{ className?: string }> = ({ className }) => {
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>('required')

  const [turnstileError, setTurnstileError] = useState<string | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
      name: '',
      side: 'Жених',
    },
  })

  const { errors } = form.formState

  const watchName = form.watch('name')

  useEffect(() => {
    if (watchName.trim().length > 0) {
      form.setValue('login', translit(watchName).replaceAll(' ', ''))
    }
  }, [watchName, form])

  function onSubmit(values: SignUpFormValues) {
    console.log(values)

    if (turnstileStatus !== 'success') {
      setTurnstileError(TURNSTILE_ERROR)
      return
    } else {
      setTurnstileError(null)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${className ? className : ''}`}
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
                  <SelectItem value="Жених">Жених (Артём)</SelectItem>
                  <SelectItem value="Невеста">Невеста (Алина)</SelectItem>
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

        <Turnstile setStatus={setTurnstileStatus} hidden={true} />
        {/* {turnstileError && <Label>{turnstileError}</Label>} */}

        <Button type="submit" className="cursor-pointer float-right">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
