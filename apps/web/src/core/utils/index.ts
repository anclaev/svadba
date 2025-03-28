import { clsx, type ClassValue } from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined'

export const isNull = (value: unknown): value is null => value === null

export const parseJwt = <T>(token: string): T => {
  return jwtDecode<T>(token)
}
