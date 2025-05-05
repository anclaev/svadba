'use client'

import { getImageProps } from 'next/image'
import Link from 'next/link'
import { FC, useMemo } from 'react'

import { PrimaryButton } from '@/shared/primary-button'
import { Section } from '@/shared/section'

import { ALBUM_LINK } from '@/core/constants/ui/social-links'

import type { withSection } from '@/core/types/ui'

export const DressCode: FC<withSection> = ({ section }) => {
  const weImageProps = useMemo(() => {
    const { props } = getImageProps({
      alt: 'Мы',
      src: '/assets/we.webp',
      width: 597,
      height: 712,
    })

    return props
  }, [])

  return (
    <Section
      {...section}
      className="flex flex-col items-center pl-5 pr-5 text-center !mb-0"
    >
      <div className="relative items-center flex flex-col sm:flex-row md:space-x-4 w-full md:w-auto sm:h-[250px] md:h-auto">
        <img
          {...weImageProps}
          className="order-1 sm:order-0 relative sm:absolute md:relative left-0 top-0 block w-auto h-auto max-w-[250px] sm:max-w-none sm:max-h-[250px] md:max-h-none md:max-w-[400px]"
        />
        <div className="flex justify-center flex-col sm:pl-[220px] md:pl-0">
          <span className="mb-8 max-w-auto md:max-w-[500px]">
            Мы будем признательны, если вы поддержите цветовую гамму нашего
            праздника!
          </span>
          <Link href={ALBUM_LINK} target="_blank" rel="noopener noreferrer">
            <PrimaryButton className="mb-10 sm:mb-12">
              <span>Перейти к примерам</span>
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Section>
  )
}
