import { getImageProps } from 'next/image'

import getBackgroundImage from '@utils/getBackgroundImage'

import '@styles/home.css'
import { Image } from '@nextui-org/image'

export default function Home() {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Poster',
    width: 1920,
    height: 1080,
    src: '/assets/bg.webp',
  })

  const backgroundImage = getBackgroundImage(srcSet)
  return (
    <main>
      <section
        style={{ backgroundImage }}
        className='flex min-h-screen flex-row items-center justify-center home-poster'
      >
        <span className='absolute uppercase text-lg opacity-50 -rotate-90 home__side'>
          Грандиозное свадебное мероприятие
        </span>
        <Image
          width={1002}
          height={430}
          src='/assets/poster.webp'
          alt='Poster'
          className='home-poster__img'
        />
      </section>
    </main>
  )
}
