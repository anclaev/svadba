'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'

import { formatError } from '../utils'

import type { ApiError, RegisterUser } from '../types'

export async function registerUser(
  payload: RegisterUser.ActionPayload
): Promise<RegisterUser.ActionResponse> {
  const cookieStore = await cookies()

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_SIGN_UP}?grant_type=token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as RegisterUser.ApiResponse | ApiError

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    cookieStore.set(
      COOKIES.ACCESS_TOKEN,
      (data as RegisterUser.ApiResponse).access_token,
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
      (data as RegisterUser.ApiResponse).refresh_token,
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
      (data as RegisterUser.ApiResponse).refresh_token_id,
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_REFRESH_TIME),
      }
    )

    return { user: (data as RegisterUser.ApiResponse).user }
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
