import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

import { fetchSocialLinksQuery } from '@/core/queries/fetchSocialLinks.query'
import { getQueryClient } from '@/core/utils/get-query-client'

import { SocialLinks } from '@/features/social-links'

export const metadata: Metadata = {
  title: 'Система',
  description: 'Свадьба Артема и Алины',
}

export default async function System() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(fetchSocialLinksQuery({}))

  return (
    <main className="w-full px-0 md:px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialLinks />
      </HydrationBoundary>
    </main>
  )
}
