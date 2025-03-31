import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { FC, PropsWithChildren, Suspense } from 'react'

import Loading from './loading'

import { AccountIsBlocked } from '@/features/account-is-blocked'
import { AccountIsUnverified } from '@/features/account-is-unverified'
import { Sidebar } from '@/shared/sidebar'

import { COOKIES } from '@/core/constants/cookies'

import { parseJwt } from '@/core/utils'

import type { AccessTokenPayload } from '@/core/types'

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative min-h-screen pt-[56px] md:pt-[76px] pb-6 px-4 space-x-4 flex flex-row items-start">
    {children}
  </div>
)

export const metadata: Metadata = {
  title: 'The Svadba',
  description: 'Свадьба Артема и Алины',
}

export default async function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { status } = parseJwt<AccessTokenPayload>(
    (await cookies()).get(COOKIES.ACCESS_TOKEN!)?.value as string
  )

  switch (status) {
    case 'CREATED': {
      return (
        <Container>
          <AccountIsUnverified />
        </Container>
      )
    }

    case 'BLOCKED': {
      return (
        <Container>
          <AccountIsBlocked />
        </Container>
      )
    }

    default: {
      return (
        <Container>
          <Sidebar className="fixed md:sticky top-auto bottom-[30px] md:bottom-auto md:top-[76px]" />
          <main className="w-full px-0 md:px-4">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </Container>
      )
    }
  }
}
