import type { Metadata } from 'next'

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
      <body className={`antialiased selection:bg-wheat-500`}>{children}</body>
    </html>
  )
}
