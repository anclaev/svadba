import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

export type PrimaryButtonProps = { className?: string } & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
>

export type PrimaryButtonComponent = FC<PropsWithChildren<PrimaryButtonProps>>
