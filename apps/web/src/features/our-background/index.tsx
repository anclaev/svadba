'use client'

import { motion } from 'framer-motion'
import { getImageProps } from 'next/image'
import { FC, useMemo } from 'react'

import { getBackgroundImage } from '@/core/utils/get-background-image'

export const OurBackground: FC<{ withoutTitle?: boolean }> = ({
  withoutTitle,
}) => {
  const ourBackgroundUrl = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      alt: 'Мы',
      src: '/assets/our.webp',
      width: 1728,
      height: 832,
    })

    return getBackgroundImage(srcSet)
  }, [])
  return (
    <div
      id="our"
      className={`${withoutTitle ? 'absolute top-0 right-0 left-0 h-screen z-[-1]' : 'h-[50vh] md:h-[80vh] relative'}`}
    >
      <div
        id="our__image"
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: ourBackgroundUrl }}
      />
      <div
        id="our__transition"
        className="absolute bottom-0 w-full h-[300px] bg-linear-to-t from-[rgba(250,246,239,1)] to-[rgba(246,238,224,0)]"
      ></div>
      {!withoutTitle && (
        <h1 className="flex justify-center absolute bottom-[-20px] md:bottom-[-50px] text-center left-0 right-0 z-2 text-4xl md:text-6xl font-trajan">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            className="block"
          >
            Artem
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            className="block ml-[20px] mr-[20px]"
          >
            &
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            className="block"
          >
            Alina
          </motion.span>
        </h1>
      )}
    </div>
  )
}
