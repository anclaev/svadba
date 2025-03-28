'use server'

import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'

import type { AuthLoginDataDto } from '../dtos/auth-login-data.dto'
import type { HttpError } from '../types'

export async function refreshAuth(): Promise<
  AuthLoginDataDto | HttpError | null
> {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get(COOKIES.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return null
  }

  const res = await fetch(
    `${process.env.API_URL}${API_ENDPOINTS.AUTH_REFRESH}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  if (!res.ok) {
    cookieStore.delete(COOKIES.REFRESH_TOKEN)
    return { message: 'Ваша сессия завершена.' }
  }

  const data = (await res.json()) as AuthLoginDataDto

  cookieStore.set(COOKIES.ACCESS_TOKEN, data.access_token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: Number(process.env.JWT_ACCESS_TIME),
  })
  cookieStore.set(COOKIES.REFRESH_TOKEN, data.refresh_token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: Number(process.env.JWT_REFRESH_TIME),
  })

  return data
}
