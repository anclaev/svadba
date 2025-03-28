import { Metadata } from 'next'

import { AuthForm } from '@/widgets/auth-form'

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Свадьба Артема и Алины',
}

export default function Auth() {
  return (
    <main className="min-h-screen pt-16 flex items-center justify-center">
      <AuthForm className="w-[90%] max-w-[400px] pb-7" redirectUrl="/-" />
    </main>
  )
}
