import { ImageProps } from 'next/image'
import { CSSProperties, FC, PropsWithChildren } from 'react'

export type SectionProps = {
  alias: string
  title?: string
  image?: ImageProps
  className?: string
  style?: CSSProperties
}

export type SectionComponent = FC<PropsWithChildren<SectionProps>>
