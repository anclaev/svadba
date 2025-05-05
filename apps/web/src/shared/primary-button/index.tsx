'use client'
import { ButtonHTMLAttributes, FC, PropsWithChildren, useMemo } from 'react'

import './index.css'

export type PrimaryButtonProps = {
  className?: string
  variant?: 'primary' | 'outline'
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onMouseEnter' | 'onMouseLeave'
>

export const PrimaryButton: FC<PropsWithChildren<PrimaryButtonProps>> = ({
  children,
  className,
  variant = 'primary',
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const classNames = useMemo(
    () => `cursor-pointer primary-button 
        pt-3 pb-3 pl-16 pr-16
        md:pt-5 md:pb-5 md:pl-24 md:pr-24  
        select-none ${variant === 'primary' ? 'bg-[#D3A75E] text-wheat-100' : 'bg-[var(--outline)] text-primary border-chamoisee-200 border-2 primary-button--outline'} 
        ${className ? className : ''}`,
    [variant, className]
  )

  return (
    <button
      className={classNames}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  )
}
