import { Metadata } from 'next'
import { FC, PropsWithChildren, Suspense } from 'react'

import Loading from './loading'

import { Sidebar } from '@/shared/sidebar'

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative min-h-screen pt-[56px] md:pt-[76px] pb-6 px-4 space-x-4 flex flex-row items-start">
    {children}
  </div>
)

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container>
      <Sidebar className="fixed md:sticky top-auto bottom-[30px] md:bottom-auto md:top-[76px]" />
      <main className="w-full px-0 md:px-4">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </Container>
  )
}
