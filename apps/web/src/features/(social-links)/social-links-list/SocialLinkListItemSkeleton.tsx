'use client'

import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'
import { TableCell, TableRow } from '@/shared/ui/table'

export const SocialLinkListItemSkeleton: FC = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-[200px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[200px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[40px]" />
    </TableCell>
  </TableRow>
)
