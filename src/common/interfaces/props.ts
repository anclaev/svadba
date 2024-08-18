import type * as ReactTypes from 'react'

export type WithChildren = {
  children: ReactTypes.ReactNode
}

export type WithClass = {
  className?: string
}

export type CurvedProps = {
  text: string
  width: number
  height: number
  cx?: number
  cy?: number
  rx?: number
  ry?: number
  dy?: number
  startOffset?: number
  reversed?: boolean
  fontSize?: number
  color?: string
} & WithClass
