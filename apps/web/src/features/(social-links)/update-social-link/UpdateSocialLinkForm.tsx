import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
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

import { updateSocialLink } from '@/core/actions/updateSocialLink'

import {
  UpdateSocialLinkFormSchema,
  UpdateSocialLinkFormValues,
} from '@/core/schemes/update-social-link-form-schema'

import type { UpdateSocialLink } from '@/core/types/update-social-link'
import type { UpdateSocialLinkDialogProps } from './UpdateSocialLinkDialog'

export const UpdateSocialLinkForm: FC<UpdateSocialLinkDialogProps> = ({
  initialState,
  handleUpdated,
  closeDialog,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateSocialLink,
    onSuccess: (data: UpdateSocialLink.ActionResponse) => {
      if (!data.link) {
        toast(data.error!.message!)
        return
      }

      handleUpdated(data.link)
      closeDialog()
    },
  })

  const form = useForm<UpdateSocialLinkFormValues>({
    resolver: zodResolver(UpdateSocialLinkFormSchema),
    defaultValues: {
      href: initialState.href,
      icon: initialState.icon || undefined,
      title: initialState.title,
    },
  })

  const { errors } = form.formState

  async function onSubmit(values: UpdateSocialLinkFormValues) {
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
          {isPending ? <Loader2 className="animate-spin" /> : 'Сохранить'}
        </Button>
      </form>
    </Form>
  )
}
