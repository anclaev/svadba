'use client'

import { motion } from 'framer-motion'
import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'

import { PrimaryButton } from '@/shared/primary-button'
import { Section } from '@/shared/section'

import { PLACE_ADDRESS, PLACE_PHONE_NUMBER } from '@/core/constants/ui/place'
import { PLACE_LINK, PLACE_ROUTE_LINK } from '@/core/constants/ui/social-links'

import { getBackgroundImage } from '@/core/utils/get-background-image'

import type { withSection } from '@/core/types/ui'

import './index.css'

export const Place: FC<withSection> = ({ section }) => {
  const [mapIsShow, setMapIsShow] = useState<boolean>(false)

  const placeSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: '/assets/park-otel.webp',
      alt: 'Парк Отель',
      width: 1728,
      height: 544,
    })

    return getBackgroundImage(srcSet)
  }, [])

  const mapSrc = useMemo(() => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: '/assets/map.webp',
      alt: 'Карта',
      width: 1728,
      height: 544,
    })

    return getBackgroundImage(srcSet)
  }, [])

  return (
    <Section {...section} style={{ marginBottom: 0 }}>
      <div
        className="relative min-h-[444px] bg-no-repeat px-7 py-20 flex items-center place-container"
        style={{
          backgroundImage: placeSrc,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          viewport={{ once: true }}
          className="bg-wheat-100 z-2 px-5 py-5 sm:px-7 sm:py-7 rounded-[20px] shadow-xl text-center flex flex-col"
        >
          <span className="font-trajan text-xl sm:text-2xl font-bold">
            Парк отель
          </span>
          <span className="mb-4 sm:mb-7">Гостиничный комплекс</span>
          <div className="text-sm sm:text-base">
            <div className="flex items-center mb-2.5">
              <Image
                src="/assets/icons/geo.svg"
                alt="Geo"
                width={24}
                height={24}
                className="mr-2.5"
              />
              <span>{PLACE_ADDRESS}</span>
            </div>
            <div className="flex items-center mb-2.5">
              <Image
                src="/assets/icons/smartphone.svg"
                alt="Geo"
                width={24}
                height={24}
                className="mr-2.5"
              />
              <span>{PLACE_PHONE_NUMBER}</span>
            </div>
            <div className="flex items-center mb-7">
              <Image
                src="/assets/icons/globe.svg"
                alt="Geo"
                width={24}
                height={24}
                className="mr-2.5"
              />
              <Link
                href={PLACE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                park-otel.com
              </Link>
            </div>
            <Link
              href={PLACE_ROUTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton
                className="place-button"
                onMouseEnter={() => setMapIsShow(true)}
                onMouseLeave={() => setMapIsShow(false)}
              >
                Как добраться
              </PrimaryButton>
            </Link>
          </div>
        </motion.div>
        <div
          className="absolute z-1 top-0 left-0 right-0 bottom-0  bg-no-repeat bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: mapSrc, opacity: mapIsShow ? 1 : 0 }}
        />
      </div>
    </Section>
  )
}
