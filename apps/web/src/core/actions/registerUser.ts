'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'

import type { ApiError } from '../types'
import type { RegisterUserActionPayload } from '../types/actions-payloads'
import type { RegisterUserActionResponse } from '../types/actions-responses'
import type { ApiSignUpResponse } from '../types/api-responses'

export async function registerUser(
  payload: RegisterUserActionPayload
): Promise<RegisterUserActionResponse> {
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

    if (!res.ok) {
      const { message } = (await res.json()) as ApiError

      return { error: { message } }
    }

    const data = (await res.json()) as ApiSignUpResponse

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

    return { user: data.user }
  } catch (err) {
    Sentry.captureException(err)
    return { error: { message: 'Что-то пошло не так. Попробуйте позже.' } }
  }
}
