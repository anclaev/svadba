import { HOME_PAGE_SECTIONS } from '@/core/constants/ui/home-page-sections'

import { OurBackground } from '@/features/our-background'
import { Promo } from '@/features/promo'
import { Welcome } from '@/features/welcome'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <OurBackground />
      <Welcome />
      {HOME_PAGE_SECTIONS.map((section) => (
        <section.component section={section} key={section.alias} />
      ))}
      <Promo />
    </main>
  )
}
