import { Metadata } from 'next'

import { AccountIsBlocked } from '@/features/account-is-blocked'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function Blocked() {
  return (
    <main className="w-full px-0 md:px-4">
      <AccountIsBlocked />
    </main>
  )
}
