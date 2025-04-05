import { Metadata } from 'next'

import { AccountIsUnverified } from '@/features/(auth)/account-is-unverified'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function Unverified() {
  return (
    <main className="w-full px-0 md:px-4">
      <AccountIsUnverified />
    </main>
  )
}
