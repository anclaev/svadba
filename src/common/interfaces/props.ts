import type * as ReactTypes from 'react'

import { InputType } from './types'

export type WithChildren = {
  children: ReactTypes.ReactNode
}

export type WithClass = {
  className?: string
}

export type WithClick = {
  onClick?: (e: any) => void
}

export type IsModalProps = {
  isModal?: boolean
}

export type InputProps = {
  type: InputType
  label?: string
  placeholder?: string
  description?: string
  value?: string
  onChange?: (event: any) => void
} & WithClass

export type StorageProps<T> = {
  key: string
  defaultValue: T
}
