'use client'

import { useEffect, useState } from 'react'

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
      <span>Logo</span>
      <span />
    </header>
  )
}

export default Header
