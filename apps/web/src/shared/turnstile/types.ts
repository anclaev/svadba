import { FC } from 'react'

export type TurnstileStatus = 'success' | 'error' | 'expired' | 'required'
export type TurnstileProps = {
  setStatus: (status: TurnstileStatus) => void
}
export type TurnsitleComponent = FC<TurnstileProps>
