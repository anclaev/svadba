'use client'

import { useEffect, useState } from 'react'
import { calcTimeDelta, CountdownTimeDelta } from 'react-countdown'

const initialDelta: CountdownTimeDelta = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  total: 0,
  completed: false,
}

export const useTimer = (date: Date): CountdownTimeDelta => {
  const [delta, setDelta] = useState<CountdownTimeDelta>(initialDelta)

  useEffect(() => {
    const interval = setInterval(() => {
      setDelta(calcTimeDelta(date))
    })

    return () => {
      clearInterval(interval)
    }
  }, [date])

  return {
    ...delta,
  }
}
