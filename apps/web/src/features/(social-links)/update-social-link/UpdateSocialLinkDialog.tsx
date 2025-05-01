import { XIcon } from 'lucide-react'
import { FC } from 'react'

import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { UpdateSocialLinkForm } from './UpdateSocialLinkForm'

import type { SocialLinkModel } from '@/core/models/social-link.model'

type InitialFormState = {
  id: string
  title: string
  href: string
  icon: string | null
}

export type UpdateSocialLinkDialogProps = {
  initialState: InitialFormState
  closeDialog: () => void
  handleUpdated: (link: SocialLinkModel) => void
}

export const UpdateSocialLinkDialog: FC<UpdateSocialLinkDialogProps> = (
  props
) => {
  return (
    <DialogContent
      className="sm:max-w-[400px] max-h-[calc(100vh-42px)] overflow-y-auto"
      aria-describedby="Изменить ссылку"
    >
      <DialogHeader>
        <DialogTitle className="text-center font-normal">
          Изменить ссылку
        </DialogTitle>
        <DialogClose
          className="cursor-pointer ring-offset-background focus:ring-ring bg-accent text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={props.closeDialog}
        >
          <XIcon />
          <span className="sr-only">Закрыть</span>
        </DialogClose>
      </DialogHeader>
      <UpdateSocialLinkForm {...props} />
    </DialogContent>
  )
}
