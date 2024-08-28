'use client'

import { useEffect, useState } from 'react'
import { Button, Tooltip } from '@nextui-org/react'
import { Image } from '@nextui-org/image'

import Logo from '@components/Logo'

import './Header.css'

const Header = () => {
  const [isTop, setIsTop] = useState<boolean>(true)

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
      <span className='header-date'>23/08/25</span>
      <Tooltip
        content='Войти как гость'
        delay={1500}
        placement='left'
        color='primary'
      >
        <Button isIconOnly className='bg-transparent'>
          <Image width={30} height={30} alt='Войти' src='/assets/login.svg' />
        </Button>
      </Tooltip>
    </header>
  )
}

export default Header
