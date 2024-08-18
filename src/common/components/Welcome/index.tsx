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
      className='flex min-h-screen flex-row items-center justify-center welcome'
    >
      <Image
        width={717}
        height={307}
        src='/assets/poster.webp'
        alt='Poster'
        className='welcome-poster'
      />
      <LoginButton className='welcome-login' />
    </section>
  )
}
