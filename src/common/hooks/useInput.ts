'use client'

import { useState } from 'react'

import { InputOptions } from '@interfaces/types'

const useInput = (initialValue: string): InputOptions => {
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
