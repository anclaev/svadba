'use client'

import { FC } from 'react'

import { Skeleton } from '@/shared/ui/skeleton'

export const GuestListItemSkeleton: FC = () => (
  <div>
    <Skeleton className="h-4 w-[100px]" />
  </div>
)
