import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  description: 'Свадьба Артема и Алины',
}

export default function My() {
  return <main className="min-h-screen pt-16">Личный кабинет гостя</main>
}
