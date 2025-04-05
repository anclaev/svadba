'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import { formatError, isNull } from '@/core/utils'

import { refreshUser } from '@/core/actions/refreshUser'

import type { ApiError, GetProfile } from '../types'

export async function getProfile(): Promise<GetProfile.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  if (!accessToken) {
    const refreshResponse = await refreshUser()

    if (isNull(refreshResponse)) {
      return null
    }

    if (refreshResponse.error) {
      return { error: refreshResponse.error }
    }

    return { user: refreshResponse.user }
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_PROFILE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        mode: 'cors',
      }
    )

    const data = (await res.json()) as GetProfile.ApiResponse | ApiError

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    return { user: data as GetProfile.ApiResponse }
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
