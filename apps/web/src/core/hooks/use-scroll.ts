'use client'

import { useEffect, useState } from 'react'

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
