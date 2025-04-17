'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'

import { PrimaryButton } from '@/shared/primary-button'
import { Section } from '@/shared/section'

import { DRESS_CODE_COLORS } from '@/core/constants/ui/dress-code'
import { ALBUM_LINK } from '@/core/constants/ui/social-links'

import type { withSection } from '@/core/types/ui'

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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
            viewport={{ once: true }}
            key={index}
            className={`
              w-[100px] h-[100px]
              md:w-[150px] md:h-[150px] 
              rounded-full`}
            style={{ backgroundColor: color }}
          ></motion.div>
        ))}
      </div>
    </Section>
  )
}
