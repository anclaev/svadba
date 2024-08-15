import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'План дня | The Svadba',
  description: 'Грандиознейшее мероприятие года',
}

export default function TimelineLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
