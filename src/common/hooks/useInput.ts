'use client'

import { useState } from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: any) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange,
  }
}

export default useInput
