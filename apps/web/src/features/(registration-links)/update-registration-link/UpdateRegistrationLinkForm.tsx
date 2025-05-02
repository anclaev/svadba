'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Switch } from '@/shared/ui/switch'

import { updateRegistrationLink } from '@/core/actions/(registration-links)'
import {
  UpdateRegistrationLinkFormSchema,
  type UpdateRegistrationLinkFormValues,
} from '@/core/schemes/(registration-links)'

import { cn, isUndefined } from '@/core/utils'
import { translit } from '@/core/utils/translit'

import type { UpdateRegistrationLink } from '@/core/types'

import type { UpdateRegistrationLinkDialogProps } from './UpdateRegistrationLinkDialog'

export const UpdateRegistrationLinkForm: FC<
  UpdateRegistrationLinkDialogProps
> = ({ initialState, handleUpdated, closeDialog }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateRegistrationLink,
    onSuccess: (data: UpdateRegistrationLink.ActionResponse) => {
      if (!data.link) {
        toast(data.error!.message!)
        return
      }

      handleUpdated(data.link)
      closeDialog()
    },
  })

  const form = useForm<UpdateRegistrationLinkFormValues>({
    resolver: zodResolver(UpdateRegistrationLinkFormSchema),
    defaultValues: {
      isActive: initialState.isActive,
      isAdmin: !isUndefined(initialState.role)
        ? initialState.role === 'ADMIN'
        : false,
      expiresAt: initialState.expiresAt,
      guestRole: initialState.guestRole,
      guestSide: initialState.guestSide,
      initialPassword: initialState.initialPassword,
      login: initialState.login,
      name: initialState.name,
    },
  })

  const { errors } = form.formState
  const watchName = form.watch('name')

  useEffect(() => {
    if (watchName && watchName.trim().length > 0) {
      form.setValue('login', translit(watchName).replaceAll(' ', ''))
    }
  }, [watchName, form])

  async function onSubmit(values: UpdateRegistrationLinkFormValues) {
    if (
      values.login &&
      initialState.login &&
      values.login.trim() === initialState.login
    ) {
      delete values['login']
    }

    mutate({ id: initialState.id, data: values })
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
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex justify-between flex-wrap">
              <FormLabel>Ссылка активна?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              {errors.isActive && (
                <Label className="grow">{errors.isActive.message}</Label>
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
                  <SelectItem value="GROOM">Жених</SelectItem>
                  <SelectItem value="BRIDE">Невеста</SelectItem>
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
          name="expiresAt"
          render={({ field }) => (
            <FormItem className="flex justify-between">
              <FormLabel>Срок действия</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[150px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format('DD/MM/YYYY')
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto cursor-pointer">
          {isPending ? <Loader2 className="animate-spin" /> : 'Сохранить'}
        </Button>
      </form>
    </Form>
  )
}
