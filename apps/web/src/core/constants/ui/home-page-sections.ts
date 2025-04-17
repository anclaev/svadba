import { DressCode } from '@/features/dress-code'
import { Place } from '@/features/place'
import { Timing } from '@/features/timing'

import type { SectionProps } from '@/shared/section'

export const HOME_PAGE_SECTIONS: SectionProps[] = [
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
