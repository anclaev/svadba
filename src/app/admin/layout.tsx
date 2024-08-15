import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Грандиознейшее мероприятие года',
}
export default function AdminLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
