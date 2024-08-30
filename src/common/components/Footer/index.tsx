import { Image } from '@nextui-org/image'
import { useMemo } from 'react'

import Logo from '@components/Logo'

import { EVENT_DATE } from '@core/constants'

import './Footer.css'
import Link from 'next/link'

export const Footer = () => {
  const date = useMemo(() => EVENT_DATE.format('DD/MM/YY').toString(), [])

  return (
    <footer className='footer flex flex-row justify-between items-center '>
      <Logo icon />
      <span className='header-date'>{date}</span>
      <Link
        href='https://t.me/anclaev'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          src='/assets/telegram.svg'
          width={30}
          height={30}
          alt='Telegram'
        />
      </Link>
    </footer>
  )
}

export default Footer
