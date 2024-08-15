import { Providers } from '@/app/providers'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

import { WithChildren } from '@interfaces/props'

import '@styles/global.css'

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Грандиознейшее мероприятие года',
}

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang='ru' className='light'>
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
