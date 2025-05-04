import type { Metadata } from 'next'

import { AuthProvider } from '@/core/providers/auth-provider'
import { AuthStoreProvider } from '@/core/providers/auth-store-provider'
import { DialogStoreProvider } from '@/core/providers/dialog-store-provider'

import { OPEN_GRAPH_IMAGE_URL } from '@/core/constants/ui/og'

import { LoginDialog } from '@/features/(auth)/login-dialog'
import { Footer } from '@/shared/footer'
import { Header } from '@/shared/header'
import { Toaster } from '@/shared/ui/sonner'

import { QueryProvider } from './providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
  openGraph: {
    title: 'The Svadba',
    description: 'Свадьба Артема и Алины',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'The Svadba',
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        secureUrl: OPEN_GRAPH_IMAGE_URL,
        type: 'image/jpeg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased selection:bg-wheat-500`}>
        <DialogStoreProvider>
          <AuthStoreProvider>
            <AuthProvider>
              <QueryProvider>
                <LoginDialog />
                <Header />
                {children}
                <Footer />
                <Toaster />
              </QueryProvider>
            </AuthProvider>
          </AuthStoreProvider>
        </DialogStoreProvider>
      </body>
    </html>
  )
}
