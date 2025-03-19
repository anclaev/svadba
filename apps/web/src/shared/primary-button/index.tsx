import type { PrimaryButtonComponent } from './types'

import './index.css'

export const PrimaryButton: PrimaryButtonComponent = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={`bg-[#D3A75E] text-wheat-100 cursor-pointer primary-button 
        pt-3 pb-3 pl-16 pr-16
        md:pt-5 md:pb-5 md:pl-24 md:pr-24  
        select-none
        ${className ? className : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
