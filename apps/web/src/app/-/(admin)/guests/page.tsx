import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

import { getQueryClient } from '@/core/utils/get-query-client'

import { GuestsList } from '@/features/(guests)/guests-list'

export const metadata: Metadata = {
  title: 'Гости',
  description: 'Свадьба Артема и Алины',
}

export default function Guests() {
  const queryClient = getQueryClient()

  return (
    <main className="w-full px-0 md:px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GuestsList />
      </HydrationBoundary>
    </main>
  )
}
