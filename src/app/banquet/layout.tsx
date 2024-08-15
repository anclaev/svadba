import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Банкет | The Svadba',
  description: 'Грандиознейшее мероприятие года',
}
export default function BanquetLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
