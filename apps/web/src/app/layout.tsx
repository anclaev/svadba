import type { Metadata } from 'next'

import { AuthProvider } from '@/core/providers/auth-provider'
import { AuthStoreProvider } from '@/core/providers/auth-store-provider'
import { DialogStoreProvider } from '@/core/providers/dialog-store-provider'
import { EnvProvider } from '@/core/providers/env-provider'

import { LoginDialog } from '@/widgets/login-dialog'

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
          <DialogStoreProvider>
            <AuthStoreProvider>
              <AuthProvider>
                <LoginDialog />
                <Header />
                {children}
                <Footer />
                <Toaster />
              </AuthProvider>
            </AuthStoreProvider>
          </DialogStoreProvider>
        </EnvProvider>
      </body>
    </html>
  )
}
