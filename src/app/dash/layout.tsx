import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Профиль | The Svadba',
  description: 'Грандиознейшее мероприятие года',
}
export default function DashLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
