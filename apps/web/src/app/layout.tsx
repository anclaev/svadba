import type { Metadata } from 'next'

import { EnvProvider } from '@/core/providers/env-provider'

import { Footer } from '@/shared/footer'
import { Header } from '@/shared/header'
import { Toaster } from '@/shared/ui/sonner'

import './globals.css'

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
        <EnvProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </EnvProvider>
      </body>
    </html>
  )
}
