'use client'

import { Image } from '@nextui-org/image'
import Link from 'next/link'
import { FC } from 'react'

import './Logo.css'

type LogoProps = {
  icon?: boolean
}

export const Logo: FC<LogoProps> = ({ icon } = { icon: false }) => (
  <Link className={icon ? 'logo-icon' : 'logo'} href='/'>
    {icon ? (
      <Image
        width={40}
        height={40}
        title='Артём & Алина'
        alt='Артём & Алина'
        src='/assets/logo-icon.svg'
      />
    ) : (
      <Image
        width={302}
        height={19}
        title='Logo'
        alt='Logo'
        src='/assets/logo.svg'
      />
    )}
  </Link>
)

export default Logo
