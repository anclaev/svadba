'use client'

import { Command, Copy, Pen, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC, useCallback, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

export type SocialLinkListItemCommandsProps = {
  id: string
  href: string
  handleUpdateItem: () => void
  handleDeleteItem: () => void
}

export const SocialLinkListItemCommands: FC<
  SocialLinkListItemCommandsProps
> = ({ href, handleUpdateItem, handleDeleteItem }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleCopy = useCallback(() => {
    if (navigator) {
      navigator.clipboard.writeText(href).then(() => {
        toast('Ссылка успешно скопирована!')
        setOpen(false)
      })
    }
  }, [href])

  const handleChange = useCallback(() => {
    setOpen(false)
    handleUpdateItem()
  }, [handleUpdateItem])

  const handleDelete = useCallback(() => {
    setOpen(false)
    handleDeleteItem()
  }, [handleDeleteItem])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Command />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min text-sm space-y-2 ">
        <Link
          onClick={handleCopy}
          href="#"
          className="flex space-x-2 items-center transition-all hover:text-primary"
        >
          <Copy size={16} />
          <span className="mb-[2px]">Скопировать</span>
        </Link>
        <Link
          onClick={handleChange}
          href="#"
          className="flex space-x-2 items-center transition-all hover:text-primary"
        >
          <Pen size={16} />
          <span className="mb-[2px]">Изменить</span>
        </Link>
        <Link
          onClick={handleDelete}
          href="#"
          className="flex space-x-2 items-center transition-all hover:text-primary"
        >
          <Trash2 size={16} />
          <span className="mb-[2px]">Удалить</span>
        </Link>
      </PopoverContent>
    </Popover>
  )
}
