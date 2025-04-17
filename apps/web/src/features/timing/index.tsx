'use client'

import { motion } from 'framer-motion'
import Image, { getImageProps } from 'next/image'
import { FC, useMemo } from 'react'

import { getBackgroundImage } from '@/core/utils/get-background-image'

import { Section } from '@/shared/section'

import type { withSection } from '@/core/types/ui'

import './index.css'

const timingItems: {
  iconSrc: string
  time: string
  title: string
}[] = [
  {
    iconSrc: '/assets/icons/rings.svg',
    time: '12:00',
    title: 'Торжественная регистрация',
  },
  {
    iconSrc: '/assets/icons/drink.svg',
    time: '15:00',
    title: 'Сбор гостей и фуршет',
  },
  {
    iconSrc: '/assets/icons/banket.svg',
    time: '18:00',
    title: 'Банкет',
  },
  {
    iconSrc: '/assets/icons/cake.svg',
    time: '19:00',
    title: 'Торт',
  },
  {
    iconSrc: '/assets/icons/salut.svg',
    time: '22:00',
    title: 'Завершение торжества',
  },
]

export const Timing: FC<withSection> = ({ section }) => {
  const dateSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: '/assets/date.webp',
      alt: '23.08.2025',
      width: 1076,
      height: 610,
    })

    return getBackgroundImage(srcSet)
  }, [])

  const flowerLeftSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: '/assets/flower-timing-left.webp',
      alt: 'Flower',
      width: 180,
      height: 375,
    })
    return getBackgroundImage(srcSet)
  }, [])

  const flowerRightSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: '/assets/flower-timing-right.webp',
      alt: 'Flower',
      width: 180,
      height: 375,
    })
    return getBackgroundImage(srcSet)
  }, [])

  return (
    <Section
      {...section}
      className="relative flex justify-center items-center flex-col bg-no-repeat"
      style={{
        backgroundImage: dateSrc,
        backgroundPosition: 'center bottom',
        backgroundSize: 'contain',
      }}
    >
      <div className="grid gap-y-8 lg:gap-y-10 pl-3 pr-3 md:pl-5 md:pr-5 z-1">
        {timingItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeIn', delay: 1 * index }}
            viewport={{ once: true }}
            key={index}
            className="flex items-center timing-item"
          >
            <Image
              src={item.iconSrc}
              alt={item.title}
              width={100}
              height={100}
              className="select-none
            w-[50px] h-[50px] mr-4
               md:w-[75px] md:h-[75px] md:mr-10"
            />
            <span
              className="block font-trajan timing-time 
              min-w-[70px] pl-4 pr-4 text-xl mt-[4px]
              md:min-w-[100px] md:pl-7 md:pr-7 md:text-2xl md:mt-[5px]"
            >
              {item.time.slice(0, item.time.indexOf(':'))}
              <sup>
                {item.time.slice(item.time.indexOf(':') + 1, item.time.length)}
              </sup>
            </span>
            <span className="text-base md:text-xl">{item.title}</span>
          </motion.div>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-no-repeat hidden sm:block z-0 select-none"
        style={{
          backgroundImage: flowerLeftSrc,
          backgroundPosition: 'top left',
        }}
      ></div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-no-repeat hidden sm:block z-0 select-none"
        style={{
          backgroundImage: flowerRightSrc,
          backgroundPosition: 'bottom right',
        }}
      ></div>
    </Section>
  )
}
