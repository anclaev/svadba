import { XIcon } from 'lucide-react'
import { FC } from 'react'

import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { UpdateRegistrationLinkForm } from './UpdateRegistrationLinkForm'

import type { GuestRole, GuestSide, UserRole } from '@/core/models'
import type { RegistrationLinkModel } from '@/core/models/(registration-links)'

export type InitialFormState = {
  id: string
  expiresAt: Date
  isActive: boolean
  login?: string
  name?: string
  role?: UserRole
  guestRole?: GuestRole
  guestSide?: GuestSide
  initialPassword?: string
}

export type UpdateRegistrationLinkDialogProps = {
  initialState: InitialFormState
  closeDialog: () => void
  handleUpdated: (link: RegistrationLinkModel) => void
}

export const UpdateRegistrationLinkDialog: FC<
  UpdateRegistrationLinkDialogProps
> = (props) => {
  return (
    <DialogContent
      className="sm:max-w-[400px] max-h-[calc(100vh-42px)] overflow-y-auto"
      aria-describedby="Создать регистрационную ссылку"
    >
      <DialogHeader>
        <DialogTitle className="text-center text-sm">
          Изменить регистрационную ссылку
        </DialogTitle>
        <DialogClose
          className="cursor-pointer ring-offset-background focus:ring-ring bg-accent text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={props.closeDialog}
        >
          <XIcon />
          <span className="sr-only">Закрыть</span>
        </DialogClose>
      </DialogHeader>
      <UpdateRegistrationLinkForm {...props} />
    </DialogContent>
  )
}
