import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
