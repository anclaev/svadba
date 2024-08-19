'use client'

import { useEffect, useState } from 'react'

import { StorageProps } from '@interfaces/props'

const useSessionStorage = <T>({ key, defaultValue }: StorageProps<T>) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue: T

    try {
      currentValue = JSON.parse(
        String(sessionStorage.getItem(key) || defaultValue)
      ) as T
    } catch {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return { value, setValue }
}

export default useSessionStorage
