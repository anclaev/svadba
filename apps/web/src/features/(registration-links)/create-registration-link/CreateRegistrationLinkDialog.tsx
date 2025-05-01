import { XIcon } from 'lucide-react'
import { FC } from 'react'

import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { CreateRegistrationLinkForm } from './CreateRegistrationLinkForm'

import type { RegistrationLinkModel } from '@/core/models/(registration-links)'

export type CreateRegistrationLinkDialogProps = {
  closeDialog: () => void
  handleCreated: (link: RegistrationLinkModel) => void
}

export const CreateRegistrationLinkDialog: FC<
  CreateRegistrationLinkDialogProps
> = (props) => {
  return (
    <DialogContent
      className="sm:max-w-[400px] max-h-[calc(100vh-42px)] overflow-y-auto"
      aria-describedby="Создать регистрационную ссылку"
    >
      <DialogHeader>
        <DialogTitle className="text-center text-sm">
          Создать регистрационную ссылку
        </DialogTitle>
        <DialogClose
          className="cursor-pointer ring-offset-background focus:ring-ring bg-accent text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={props.closeDialog}
        >
          <XIcon />
          <span className="sr-only">Закрыть</span>
        </DialogClose>
      </DialogHeader>
      <CreateRegistrationLinkForm {...props} />
    </DialogContent>
  )
}
