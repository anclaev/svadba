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

import { createSocialLink } from '@/core/actions/(social-links)'
import {
  CreateSocialLinkFormSchema,
  type CreateSocialLinkFormValues,
} from '@/core/schemes/(social-links)'
import { translit } from '@/core/utils/translit'

import type { SocialLinkModel } from '@/core/models'
import type { CreateSocialLink } from '@/core/types'

export type CreateSocialLinkFormProps = {
  handleCreated: (link: SocialLinkModel) => void
}

export const CreateSocialLinkForm: FC<CreateSocialLinkFormProps> = ({
  handleCreated,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createSocialLink,
    onSuccess: (data: CreateSocialLink.ActionResponse) => {
      if (!data.link) {
        toast(data.error!.message!)
        return
      }

      handleCreated(data.link)
    },
  })

  const form = useForm<CreateSocialLinkFormValues>({
    resolver: zodResolver(CreateSocialLinkFormSchema),
    defaultValues: {
      alias: '',
      href: '',
      icon: '',
      title: '',
    },
  })

  const { errors } = form.formState
  const watchTitle = form.watch('title')

  useEffect(() => {
    if (watchTitle.trim().length > 0) {
      form.setValue(
        'alias',
        translit(watchTitle).replaceAll(' ', '-').toLowerCase()
      )
    }
  }, [watchTitle, form])

  async function onSubmit(values: CreateSocialLinkFormValues) {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.title && <Label>{errors.title.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Алиас</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.alias && <Label>{errors.alias.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.href && <Label>{errors.href.message}</Label>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Иконка</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.icon && <Label>{errors.icon.message}</Label>}
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
