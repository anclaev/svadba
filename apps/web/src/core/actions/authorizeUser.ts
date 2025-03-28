'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import type { AuthorizeUserActionPayload } from '@/core/types/actions-payloads'
import type { AuthorizeUserActionResponse } from '@/core/types/actions-responses'
import type { ApiAuthLoginResponse } from '@/core/types/api-responses'

export async function authorizeUser(
  payload: AuthorizeUserActionPayload
): Promise<AuthorizeUserActionResponse> {
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

    if (!res.ok) {
      return { error: { message: 'Авторизация не пройдена.' } }
    }

    const data = (await res.json()) as ApiAuthLoginResponse

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

export default async function trackedAuthorizeUser(
  payload: AuthorizeUserActionPayload
) {
  return await Sentry.withServerActionInstrumentation(
    'authorizeUser',
    { recordResponse: true },
    async () => authorizeUser(payload)
  )
}
