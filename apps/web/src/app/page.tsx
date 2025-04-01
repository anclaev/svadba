import { OurBackground } from '@/features/our-background'
import { Welcome } from '@/features/welcome'

import { SectionProps } from '@/shared/section'

import { DressCode } from '@/features/dress-code'
import { Place } from '@/features/place'
import { Promo } from '@/features/promo'
import { Timing } from '@/features/timing'

export const HOME_SECTIONS: SectionProps[] = [
  {
    alias: 'timing',
    title: 'План дня',
    component: Timing,
    image: {
      src: '/assets/timing.webp',
      alt: 'План дня',
      width: 1728,
      height: 563,
    },
  },
  {
    alias: 'dress-code',
    title: 'Дресс-код',
    component: DressCode,
    image: {
      src: '/assets/dress-code.webp',
      alt: 'Дресс-код',
      width: 1728,
      height: 682,
    },
  },
  {
    alias: 'place',
    title: 'Место проведения',
    component: Place,
    image: {
      src: '/assets/place.webp',
      alt: 'Место проведения',
      width: 1728,
      height: 731,
    },
  },
]

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <OurBackground />
      <Welcome />
      {HOME_SECTIONS.map((section) => (
        <section.component section={section} key={section.alias} />
      ))}
      <Promo />
    </main>
  )
}
