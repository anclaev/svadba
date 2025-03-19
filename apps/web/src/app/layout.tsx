import type { Metadata } from 'next'

import './globals.css'

// import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased selection:bg-wheat-500`}>
        <Header />
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
