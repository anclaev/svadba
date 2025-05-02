'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import { formatError } from '@/core/utils'

import type { ApiError, RefreshUser } from '@/core/types'

export async function refreshUser(): Promise<RefreshUser.ActionResponse> {
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

    const data = (await res.json()) as RefreshUser.ApiResponse | ApiError

    if (!res.ok) {
      cookieStore.delete(COOKIES.REFRESH_TOKEN)
      cookieStore.delete(COOKIES.REFRESH_TOKEN_ID)
      return formatError('Ваша сессия завершена.')
    }

    cookieStore.set(
      COOKIES.ACCESS_TOKEN,
      (data as RefreshUser.ApiResponse).access_token!,
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_ACCESS_TIME),
      }
    )
    cookieStore.set(
      COOKIES.REFRESH_TOKEN,
      (data as RefreshUser.ApiResponse).refresh_token!,
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_REFRESH_TIME),
      }
    )
    cookieStore.set(
      COOKIES.REFRESH_TOKEN_ID,
      (data as RefreshUser.ApiResponse).refresh_token_id!,
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_REFRESH_TIME),
      }
    )

    return data as RefreshUser.ApiResponse
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
