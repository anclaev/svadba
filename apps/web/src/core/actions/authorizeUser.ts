'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import { formatError } from '../utils'

import type { ApiError, AuthorizeUser } from '@/core/types'

export async function authorizeUser(
  payload: AuthorizeUser.ActionPayload
): Promise<AuthorizeUser.ActionResponse> {
  const cookieStore = await cookies()

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_LOGIN}?grant_type=token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as AuthorizeUser.ApiResponse | ApiError

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    cookieStore.set(
      COOKIES.ACCESS_TOKEN,
      (data as AuthorizeUser.ApiResponse).access_token,
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
      (data as AuthorizeUser.ApiResponse).refresh_token,
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
      (data as AuthorizeUser.ApiResponse).refresh_token_id,
      {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: Number(process.env.JWT_REFRESH_TIME),
      }
    )

    return { user: (data as AuthorizeUser.ApiResponse).user }
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}

export default async function trackedAuthorizeUser(
  payload: AuthorizeUser.ActionPayload
) {
  return await Sentry.withServerActionInstrumentation(
    'authorizeUser',
    { recordResponse: true },
    async () => authorizeUser(payload)
  )
}
