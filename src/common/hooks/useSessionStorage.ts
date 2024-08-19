'use client'

import { useEffect, useState } from 'react'

import { StorageProps } from '@interfaces/props'

const useLocalStorage = <T>({ key, defaultValue }: StorageProps<T>) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue: T

    try {
      currentValue = JSON.parse(
        String(localStorage.getItem(key) || defaultValue)
      ) as T
    } catch {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return { value, setValue }
}

export default useLocalStorage
