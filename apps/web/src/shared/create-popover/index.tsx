'use client'

import { FC, PropsWithChildren, ReactNode } from 'react'

import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

export type CreatePopoverProps = PropsWithChildren<{
  title?: ReactNode
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
}>

export const CreatePopover: FC<CreatePopoverProps> = ({
  children,
  title,
  variant = 'outline',
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={variant} className="cursor-pointer">
          {title ? title : 'Создать'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">{children}</PopoverContent>
    </Popover>
  )
}
