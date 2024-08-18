'use client'

import { useState, useEffect } from 'react'

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
      <span />
      <Logo />
      <span />
    </header>
  )
}

export default Header
