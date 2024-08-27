import { getImageProps } from 'next/image'

import getBackgroundImage from '@utils/getBackgroundImage'

import './Welcome.css'

export default function Welcome() {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Мы',
    width: 1920,
    height: 1080,
    src: '/assets/we.webp',
  })

  const backgroundImage = getBackgroundImage(srcSet)

  return (
    <section
      style={{ backgroundImage }}
      className='flex flex-row items-center justify-center welcome'
    ></section>
  )
}
