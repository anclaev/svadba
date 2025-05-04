import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

import { getQueryClient } from '@/core/utils/get-query-client'

import { PendingGuests } from '@/widgets/pending-guests'

export const metadata: Metadata = {
  title: 'Панель администратора',
  description: 'Свадьба Артема и Алины',
}

export default function Dashboard() {
  const queryClient = getQueryClient()

  return (
    <main className="w-full px-0 md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PendingGuests />
      </HydrationBoundary>
    </main>
  )
}
