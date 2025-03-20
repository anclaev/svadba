'use client'

import { motion } from 'framer-motion'
import { getImageProps } from 'next/image'
import { useMemo } from 'react'

import { EVENT_DATE } from '@/core/constants/event-date'
import useTimer from '@/core/hooks/use-timer'
import getBackgroundImage from '@/core/utils/get-background-image'

export const Welcome = () => {
  const { days, hours, minutes, seconds } = useTimer(EVENT_DATE.toDate())

  const flowerSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      alt: 'Flower',
      width: 375,
      height: 825,
      src: '/assets/flower.webp',
    })

    return getBackgroundImage(srcSet)
  }, [])

  return (
    <section
      id="welcome"
      className=" relative flex justify-center items-center flex-col text-center pt-14 pb-8 md:pt-32 md:pb-28 overflow-x-hidden text-sm md:text-base"
    >
      <div id="welcome__desc" className="max-w-xl w-full pl-5 pr-5">
        <p className="pb-5">
          Дорогие гости! Мы будем счастливы разделить с вами радость
          неповторимого для нас дня - дня нашей свадьбы!
        </p>
        <p className="pb-5">
          Приглашаем присоединиться к нашему празднику и украсить его своим
          присутствием через:
        </p>
      </div>
      <div
        id="welcome-timer"
        className="flex flex-row flex-wrap select-none pl-5 pr-5 items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          id="welcome-timer__days"
          className="flex flex-col pl-7 pr-7 min-w-[115px] md:min-w-[150px] pb-5"
        >
          <span className="pb-2.5 font-bold text-4xl md:text-6xl">{days}</span>
          <span>дней</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn', delay: 0.5 }}
          id="welcome-timer__hours"
          className="flex flex-col pl-7 pr-7 min-w-[115px] md:min-w-[150px] pb-5"
        >
          <span className="pb-2.5 font-bold text-4xl md:text-6xl">{hours}</span>
          <span>часов</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn', delay: 1 }}
          id="welcome-timer__minutes"
          className="flex flex-col pl-7 pr-7 min-w-[115px] md:min-w-[150px] pb-5"
        >
          <span className="pb-2.5 font-bold text-4xl md:text-6xl">
            {minutes}
          </span>
          <span>минут</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn', delay: 1.5 }}
          id="welcome-timer__seconds"
          className="flex flex-col pl-7 pr-7 min-w-[115px] md:min-w-[150px] pb-5"
        >
          <span className="pb-2.5 font-bold text-4xl md:text-6xl">
            {seconds}
          </span>
          <span>секунд</span>
        </motion.div>
      </div>
      <div
        className="absolute top-[10%] bottom-0 w-full bg-no-repeat bg-contain select-none z-[-1] lg:right-[0px] right-[110px] hidden sm:block"
        style={{
          backgroundImage: flowerSrc,
          backgroundPosition: 'left center',
        }}
      ></div>
      <div
        className="absolute top-[10%] bottom-0 w-full bg-no-repeat bg-contain select-none z-[-1] lg:left-[0px] left-[110px] hidden sm:block"
        style={{
          backgroundImage: flowerSrc,
          backgroundPosition: 'left center',
          transform: 'scale(-1,1)',
        }}
      ></div>
    </section>
  )
}
