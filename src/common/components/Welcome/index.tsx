import { getImageProps } from 'next/image'

import LoginButton from '@components/LoginButton'

import getBackgroundImage from '@utils/getBackgroundImage'

import { Image } from '@nextui-org/image'

import './Welcome.css'

export default function Welcome() {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Poster',
    width: 1920,
    height: 1080,
    src: '/assets/bg2.jpg',
  })

  const backgroundImage = getBackgroundImage(srcSet)
  return (
    <section
      style={{ backgroundImage }}
      className='flex flex-row items-center justify-center welcome'
    >
      <Image
        width={717}
        height={307}
        src='/assets/poster.webp'
        alt='Poster'
        className='welcome-poster'
      />
      <LoginButton className='welcome-login'>
        <Image
          src='/assets/date.webp'
          width={168}
          height={168}
          alt='23.08.25 17:00'
          className='welcome-date'
        />
      </LoginButton>
    </section>
  )
}
