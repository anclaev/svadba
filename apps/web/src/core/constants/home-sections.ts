import { SectionProps } from '@/shared/section/types'

export const HOME_SECTIONS: SectionProps[] = [
  {
    alias: 'timing',
    title: 'План дня',
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
    image: {
      src: '/assets/place.webp',
      alt: 'Место проведения',
      width: 1728,
      height: 731,
    },
  },
]
