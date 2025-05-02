'use client'

import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'
import { TableCell, TableRow } from '@/shared/ui/table'

export const RegistrationLinkListItemSkeleton: FC = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-[24px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[120px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[50px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[50px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px] max-w-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[42px]" />
    </TableCell>
  </TableRow>
)
