import Link from 'next/link'
import { FC } from 'react'

import { PrimaryButton } from '@/shared/primary-button'
import { Section } from '@/shared/section'

import { DRESS_CODE_COLORS } from '@/core/constants/dress-code'
import { ALBUM_LINK } from '@/core/constants/links'

import type { withSection } from '@/core/types'

import './index.css'

export const DressCode: FC<withSection> = ({ section }) => {
  return (
    <Section
      {...section}
      className="flex flex-col items-center pl-5 pr-5 text-center"
    >
      <span className="mb-8 max-w-[500px]">
        Мы будем признательны, если вы поддержите цветовую гамму нашего
        праздника!
      </span>
      <Link href={ALBUM_LINK} target="_blank" rel="noopener noreferrer">
        <PrimaryButton className="mb-10 sm:mb-12">
          <span>Перейти к примерам</span>
        </PrimaryButton>
      </Link>
      <div className="grid dress-code-colors max-w-[990px] w-[90%]">
        {DRESS_CODE_COLORS.map((color, index) => (
          <div
            key={index}
            className={`
              w-[100px] h-[100px]
              md:w-[150px] md:h-[150px] 
              rounded-full`}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </Section>
  )
}
