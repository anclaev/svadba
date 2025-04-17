'use client'

import { FC } from 'react'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

export type ConfirmDialogProps = {
  title: string
  description: string
  cancel: string
  action: string
  handleAction: () => void
}

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => (
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle hidden>{props.title}</AlertDialogTitle>
      <AlertDialogDescription>{props.description}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="cursor-pointer">
        {props.cancel}
      </AlertDialogCancel>
      <AlertDialogAction
        className="cursor-pointer"
        onClick={props.handleAction}
      >
        {props.action}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
)
