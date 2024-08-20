import { WithChildren } from '@interfaces/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Добро пожаловать | The Svadba',
  description: 'Грандиозное мероприятие года',
}

export default function WelcomeLayout({ children }: WithChildren) {
  return <section>{children}</section>
}
