'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import type { withClassName } from '@/core/types/ui'

export const Logo: FC<withClassName> = ({ className = '' }) => (
  <Link href="/" className={className}>
    <Image
      src="/assets/logo.svg"
      alt="logo"
      width={40}
      height={40}
      className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
    />
  </Link>
)
