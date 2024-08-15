import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ваше приглашение | The Svadba',
  description: 'Грандиознейшее мероприятие года',
}
export default function InviteLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
