'use client'

import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CircleCheck, CircleSlash } from 'lucide-react'
import { FC, useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/shared/confirm-dialog'
import { AlertDialog } from '@/shared/ui/alert-dialog'
import { Badge } from '@/shared/ui/badge'
import { Dialog } from '@/shared/ui/dialog'
import { TableCell, TableRow } from '@/shared/ui/table'

import {
  UpdateRegistrationLinkDialog,
  type InitialFormState,
} from '../update-registration-link/UpdateRegistrationLinkDialog'
import { RegistrationLinkListItemCommands } from './RegistrationLinkListItemCommands'

import { deleteRegistrationLink } from '@/core/actions/(registration-links)'

import {
  parseGuestRole,
  parseGuestSide,
  parseRegistrationLinkStatus,
  parseUserRole,
} from '@/core/utils/parsers'

import {
  type RegistrationLinkItemModel,
  type RegistrationLinkModel,
} from '@/core/models/(registration-links)'

import type { DeleteRegistrationLink } from '@/core/types/(registration-links)'

export type RegistrationLinkListItemProps = {
  item: RegistrationLinkItemModel
  handleDeleted: (id: string) => void
  handleUpdated: (link: RegistrationLinkModel) => void
}

export const RegistrationLinkListItem: FC<RegistrationLinkListItemProps> = ({
  item,
  handleDeleted,
  handleUpdated,
}) => {
  const { mutate } = useMutation({
    mutationFn: deleteRegistrationLink,
    onSuccess: (data: DeleteRegistrationLink.ActionResponse) => {
      if (!data.status) {
        toast(data.error!.message!)
        return
      }

      toast('Ссылка успешно удалена.')
      handleDeleted(item.id)
    },
  })

  const [openConfirmDeleteDialog, setConfirmDeleteDialog] =
    useState<boolean>(false)

  const [openUpdateDialog, setUpdateDialog] = useState<boolean>(false)

  const initialUpdateFormState = useMemo<InitialFormState>(() => {
    return {
      id: item.id,
      expiresAt: item.expiresAt,
      isActive: item.isActive,
      guestRole: item.meta ? item.meta.guestRole : undefined,
      guestSide: item.meta ? item.meta.guestSide : undefined,
      initialPassword: item.meta ? item.meta.initialPassword : undefined,
      login: item.meta ? item.meta.login : undefined,
      name: item.meta ? item.meta.name : undefined,
      role: item.meta ? item.meta.role : undefined,
    }
  }, [item])

  const handleDeleteItem = useCallback(() => {
    mutate({ id: item.id })
  }, [item, mutate])

  return (
    <TableRow>
      <TableCell>{item.isActive ? <CircleCheck /> : <CircleSlash />}</TableCell>
      <TableCell>
        <Badge>{parseRegistrationLinkStatus(item.status)}</Badge>
      </TableCell>
      <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
      <TableCell>{dayjs(item.expiresAt).format('DD/MM/YYYY')}</TableCell>
      <TableCell>{item.meta && item.meta.name ? item.meta.name : ''}</TableCell>
      <TableCell>
        {item.meta && item.meta.login ? item.meta.login : ''}
      </TableCell>
      <TableCell>
        {item.meta && item.meta.role ? (
          <Badge className="mr-[10px]" variant="secondary">
            {parseUserRole(item.meta.role)}
          </Badge>
        ) : (
          ''
        )}
        {item.meta && item.meta.guestRole ? (
          <Badge>{parseGuestRole(item.meta.guestRole)}</Badge>
        ) : (
          ''
        )}
      </TableCell>
      <TableCell>
        {item.meta && item.meta.guestSide
          ? parseGuestSide(item.meta.guestSide)
          : ''}
      </TableCell>
      <TableCell>
        <RegistrationLinkListItemCommands
          id={item.id}
          // href={item.href}
          href=""
          handleUpdateItem={() => setUpdateDialog(true)}
          handleDeleteItem={() => setConfirmDeleteDialog(true)}
        />
      </TableCell>
      <AlertDialog
        open={openConfirmDeleteDialog}
        onOpenChange={setConfirmDeleteDialog}
      >
        <ConfirmDialog
          title="Удаление регистрационной ссылки"
          description="Вы уверены, что хотите регистрационную ссылку?"
          cancel="Нет, я передумал"
          action="Да, конечно!"
          handleAction={handleDeleteItem}
        />
      </AlertDialog>
      <Dialog open={openUpdateDialog} onOpenChange={setUpdateDialog}>
        <UpdateRegistrationLinkDialog
          initialState={initialUpdateFormState}
          handleUpdated={handleUpdated}
          closeDialog={() => setUpdateDialog(false)}
        />
      </Dialog>
    </TableRow>
  )
}
