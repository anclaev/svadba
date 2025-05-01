import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

import { getQueryClient } from '@/core/utils/get-query-client'

import { RegistrationLinksList } from '@/features/(registration-links)/registration-links-list'
import { SocialLinksList } from '@/features/(social-links)/social-links-list'

export const metadata: Metadata = {
  title: 'Система',
  description: 'Свадьба Артема и Алины',
}

export default async function System() {
  const queryClient = getQueryClient()

  // await queryClient.prefetchQuery(fetchSocialLinksQuery({}))

  return (
    <main className="w-full px-0 md:px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialLinksList />
        <RegistrationLinksList />
      </HydrationBoundary>
    </main>
  )
}
