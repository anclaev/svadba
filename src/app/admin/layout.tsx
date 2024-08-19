import type { Metadata } from 'next'

import { WithChildren } from '@interfaces/props'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Грандиознейшее мероприятие года',
}
export default function AdminLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
