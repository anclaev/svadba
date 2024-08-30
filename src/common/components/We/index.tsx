import { getImageProps } from 'next/image'

import getBackgroundImage from '@utils/getBackgroundImage'

import './We.css'

const We = () => {
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
      className='flex flex-row items-center justify-center we'
    >
      <h1 className='we__title'>Artem & Alina</h1>
    </section>
  )
}

export default We
