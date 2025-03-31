import { Metadata } from 'next'

import { AccountIsUnverified } from '@/features/account-is-unverified'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function Unverified() {
  return <AccountIsUnverified />
}
