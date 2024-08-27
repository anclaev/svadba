import { Providers } from '@/app/providers'
import { Montserrat } from 'next/font/google'

import Header from '@components/Header'

import { WithChildren } from '@interfaces/props'

import '@styles/global.css'

const font = Montserrat({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500'],
  preload: true,
})

export function generateMetadata() {
  const ogImageUrl = new URL(`${process.env.ORIGIN}/assets/og.jpg`)
  return {
    title: 'The Svadba',
    description: 'Бракосочетание Артема и Алины',
    applicationName: 'The Svadba',
    appleWebApp: {
      title: 'The Svadba',
    },
    manifest: '/site.webmanifest?v=2',
    metadataBase: new URL(process.env.ORIGIN ?? 'http://localhost:3000'),
    other: {
      'apple-mobile-web-app-title': 'The Svadba',
      'application-name': 'The Svadba',
      'msapplication-TileColor': '#faf6ef',
      'theme-color': '#faf6ef',
    },
    icons: [
      {
        type: 'image/png',
        sizes: '32x32',
        url: '/icons/favicon-32x32.png?v=2',
        rel: 'icon',
      },
      {
        type: 'image/png',
        sizes: '16x16',
        url: '/icons/favicon-16x16.png?v=2',
        rel: 'icon',
      },
      {
        sizes: '180x180',
        url: '/icons/apple-touch-icon.png?v=2',
        rel: 'apple-touch-icon',
      },
      {
        color: '#faf6ef',
        url: '/icons/safari-pinned-tab.svg?v=2',
        rel: 'mask-icon',
      },
      {
        url: '/favicon.ico?v=2',
        rel: 'shortcut icon',
      },
    ],
    openGraph: {
      type: 'website',
      title: 'The Svadba',
      description: `Бракосочетание Артема и Алины`,
      locale: 'ru',
      images: [
        {
          type: 'image/jpeg',
          url: ogImageUrl,
          alt: 'The Svadba',
          width: 968,
          height: 504,
          secureUrl: ogImageUrl,
        },
      ],
    },
  }
}

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang='ru' className='light'>
      <body className={font.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
