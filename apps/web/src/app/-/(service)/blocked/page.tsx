import { Metadata } from 'next'

import { AccountIsBlocked } from '@/features/account-is-blocked'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function Blocked() {
  return <AccountIsBlocked />
}
