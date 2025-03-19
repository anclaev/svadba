import { FC } from 'react'

export type TurnstileStatus = 'success' | 'error' | 'expired' | 'required'
export type TurnstileWidgetProps = {
  setStatus: (status: TurnstileStatus) => void
}
export type TurnsitleWidgetComponent = FC<TurnstileWidgetProps>
