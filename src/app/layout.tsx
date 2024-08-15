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
  applicationName: 'The Svadba',
  appleWebApp: {
    title: 'The Svadba',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(process.env.ORIGIN ?? 'http://localhost:3000'),
  other: {
    'apple-mobile-web-app-title': 'The Svadba',
    'application-name': 'The Svadba',
    'msapplication-TileColor': '#da532c',
    'theme-color': '#da532c',
  },
  icons: [
    {
      type: 'image/png',
      sizes: '32x32',
      url: '/icons/favicon-32x32.png',
      rel: 'icon',
    },
    {
      type: 'image/png',
      sizes: '16x16',
      url: '/icons/favicon-16x16.png',
      rel: 'icon',
    },
    {
      sizes: '180x180',
      url: '/icons/apple-touch-icon.png',
      rel: 'apple-touch-icon',
    },
    {
      color: '#da532c',
      url: '/icons/safari-pinned-tab.svg',
      rel: 'mask-icon',
    },
    {
      url: '/favicon.ico',
      rel: 'shortcut icon',
    },
  ],
  openGraph: {
    type: 'website',
    title: 'The Svadba',
    description: `Грандиознейшее событие года`,
    locale: 'ru',
    images: [],
  },
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
