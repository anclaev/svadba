'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FC, useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/shared/confirm-dialog'
import { AlertDialog } from '@/shared/ui/alert-dialog'
import { Dialog } from '@/shared/ui/dialog'
import { TableCell, TableRow } from '@/shared/ui/table'

import { UpdateSocialLinkDialog } from '../update-social-link/UpdateSocialLinkDialog'
import { SocialLinkListItemCommands } from './SocialLinkListItemCommands'

import { deleteSocialLink } from '@/core/actions/deleteSocialLink'

import type {
  SocialLinkItemModel,
  SocialLinkModel,
} from '@/core/models/social-link.model'
import type { DeleteSocialLink } from '@/core/types'

export type SocialLinkListItemProps = {
  item: SocialLinkItemModel
  handleDeleted: (id: string) => void
  handleUpdated: (link: SocialLinkModel) => void
}

export const SocialLinkListItem: FC<SocialLinkListItemProps> = ({
  item,
  handleDeleted,
  handleUpdated,
}) => {
  const { mutate } = useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: (data: DeleteSocialLink.ActionResponse) => {
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

  const initialUpdateFormState = useMemo(() => {
    return {
      id: item.id,
      title: item.title,
      href: item.href,
      icon: item.icon,
    }
  }, [item])

  const handleDeleteItem = useCallback(() => {
    mutate({ id: item.id })
  }, [item, mutate])

  return (
    <TableRow>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.alias}</TableCell>
      <TableCell>
        <Link href={item.href} rel="noreferrer noopenner" target="_blank">
          {item.href}
        </Link>
      </TableCell>
      <TableCell>
        <SocialLinkListItemCommands
          id={item.id}
          href={item.href}
          handleUpdateItem={() => setUpdateDialog(true)}
          handleDeleteItem={() => setConfirmDeleteDialog(true)}
        />
      </TableCell>
      <AlertDialog
        open={openConfirmDeleteDialog}
        onOpenChange={setConfirmDeleteDialog}
      >
        <ConfirmDialog
          title="Удаление социальной ссылки"
          description="Вы уверены, что хотите удалить ссылку?"
          cancel="Нет, я передумал"
          action="Да, конечно!"
          handleAction={handleDeleteItem}
        />
      </AlertDialog>
      <Dialog open={openUpdateDialog} onOpenChange={setUpdateDialog}>
        <UpdateSocialLinkDialog
          initialState={initialUpdateFormState}
          handleUpdated={handleUpdated}
          closeDialog={() => setUpdateDialog(false)}
        />
      </Dialog>
    </TableRow>
  )
}
