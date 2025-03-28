'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import type { RefreshUserActionResponse } from '@/core/types/actions-responses'
import type { ApiAuthRefreshResponse } from '@/core/types/api-responses'

export async function refreshUser(): Promise<RefreshUserActionResponse> {
  const cookieStore = await cookies()

  const refreshToken = cookieStore.get(COOKIES.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return null
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_REFRESH}?grant_type=token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
          mode: 'cors',
        },
      }
    )

    if (!res.ok) {
      cookieStore.delete(COOKIES.REFRESH_TOKEN)
      cookieStore.delete(COOKIES.REFRESH_TOKEN_ID)
      return { error: { message: 'Ваша сессия завершена.' } }
    }

    const data = (await res.json()) as ApiAuthRefreshResponse

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
    cookieStore.set(COOKIES.REFRESH_TOKEN_ID, data.refresh_token_id, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: Number(process.env.JWT_REFRESH_TIME),
    })

    return data
  } catch (err) {
    Sentry.captureException(err)
    return { error: { message: 'Что-то пошло не так. Попробуйте позже.' } }
  }
}
