import { Button } from '@/shared/ui/button'
import Link from 'next/link'

import { OurBackground } from '@/features/our-background'

export default function NotFound() {
  return (
    <main className="relative h-screen flex items-center justify-center">
      <div
        className="flex flex-col items-center p-5 rounded-lg"
        style={{ backgroundColor: 'rgba(250, 246, 239, 0.8)' }}
      >
        <span className="mb-5">Упс, страница не найдена</span>
        <Link href="/" className="select-none">
          <Button className="cursor-pointer">Вернуться на главную</Button>
        </Link>
      </div>
      <OurBackground withoutTitle />
    </main>
  )
}
