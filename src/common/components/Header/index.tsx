'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Image } from '@nextui-org/image'

import Logo from '@components/Logo'

import './Header.css'
import { EVENT_DATE } from '@core/constants'

const Header = () => {
  const [isTop, setIsTop] = useState<boolean>(true)

  const date = useMemo(() => EVENT_DATE.format('DD/MM/YY').toString(), [])

  useEffect(() => {
    const scrollHandler = () =>
      typeof window !== 'undefined' && window.scrollY > 100
        ? setIsTop(false)
        : setIsTop(true)

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [isTop])

  return (
    <header
      className={`fixed z-20 flex flex-row justify-between items-center text-white ${!isTop ? 'header--scrolled' : 'bg-transparent'} header`}
    >
      <Logo icon />
      <span className='header-date'>{date}</span>

      <Button
        isIconOnly
        className='bg-transparent relative'
        title='Войти в систему'
      >
        <Image width={30} height={30} alt='Войти' src='/assets/login.svg' />
      </Button>
    </header>
  )
}

export default Header
