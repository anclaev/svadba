'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useEffect } from 'react'
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
import { Switch } from '@/shared/ui/switch'

import { createRegistrationLink } from '@/core/actions/(registration-links)'
import {
  CreateRegistrationLinkFormSchema,
  type CreateRegistrationLinkFormValues,
} from '@/core/schemes/(registration-links)'

import { EXPIRATION_S } from '@/core/constants/expiration'
import { translit } from '@/core/utils/translit'

import type { CreateRegistrationLink } from '@/core/types'

import type { CreateRegistrationLinkDialogProps } from './CreateRegistrationLinkDialog'

export const CreateRegistrationLinkForm: FC<
  CreateRegistrationLinkDialogProps
> = ({ handleCreated, closeDialog }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createRegistrationLink,
    onSuccess: (data: CreateRegistrationLink.ActionResponse) => {
      if (!data.link) {
        toast(data.error!.message!)
        return
      }

      handleCreated(data.link)
      closeDialog()
    },
  })

  const form = useForm<CreateRegistrationLinkFormValues>({
    resolver: zodResolver(CreateRegistrationLinkFormSchema),
    defaultValues: {
      expiration: EXPIRATION_S.WEEK,
      isAdmin: false,
    },
  })

  const { errors } = form.formState
  const watchName = form.watch('name')

  useEffect(() => {
    if (watchName && watchName.trim().length > 0) {
      form.setValue('login', translit(watchName).replaceAll(' ', ''))
    }
  }, [watchName, form])

  async function onSubmit(values: CreateRegistrationLinkFormValues) {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Имя пользователя"
                  autoComplete="new-password"
                />
              </FormControl>
              {errors.name && <Label>{errors.name.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Логин пользователя"
                  autoComplete="new-password"
                />
              </FormControl>
              {errors.login && <Label>{errors.login.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Пароль пользователя"
                  autoComplete="new-password"
                />
              </FormControl>
              {errors.initialPassword && (
                <Label>{errors.initialPassword.message}</Label>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem className="flex justify-between flex-wrap">
              <FormLabel>Он - администратор?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              {errors.isAdmin && (
                <Label className="grow">{errors.isAdmin.message}</Label>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestRole"
          render={({ field }) => (
            <FormItem className="flex justify-between flex-wrap">
              <FormLabel>Роль гостя</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Не выбрано" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GUEST">Гость</SelectItem>
                  <SelectItem value="PARENT">Родитель</SelectItem>
                  <SelectItem value="CLOSE">Близкий</SelectItem>
                </SelectContent>
              </Select>
              {errors.guestRole && (
                <Label className="grow">{errors.guestRole.message}</Label>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestSide"
          render={({ field }) => (
            <FormItem className="flex justify-between flex-wrap">
              <FormLabel>Сторона гостя</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Не выбрано" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GROOM">Жених</SelectItem>
                  <SelectItem value="BRIDE">Невеста</SelectItem>
                </SelectContent>
              </Select>
              {errors.guestSide && (
                <Label className="grow">{errors.guestSide.message}</Label>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiration"
          render={({ field }) => (
            <FormItem className="flex justify-between flex-wrap">
              <FormLabel>Срок действия ссылки</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value ?? '')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Не выбрано" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={String(EXPIRATION_S.DAY)}>День</SelectItem>
                  <SelectItem value={String(EXPIRATION_S.WEEK)}>
                    Неделя
                  </SelectItem>
                  <SelectItem value={String(EXPIRATION_S.MONTH)}>
                    Месяц
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.expiration && (
                <Label className="grow">{errors.expiration.message}</Label>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto cursor-pointer">
          {isPending ? <Loader2 className="animate-spin" /> : 'Создать'}
        </Button>
      </form>
    </Form>
  )
}
