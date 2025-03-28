'use server'

import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import { isNull } from '@/core/utils'

import { refreshUser } from '@/core/actions/refreshUser'

import type { FetchProfileActionResponse } from '@/core/types/actions-responses'
import type { ApiAuthProfileResponse } from '@/core/types/api-responses'

export async function fetchUserProfile(): Promise<FetchProfileActionResponse> {
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

  const res = await fetch(
    `${process.env.API_URL}${API_ENDPOINTS.AUTH_PROFILE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!res.ok) {
    return { error: { message: 'Что-то пошло не так.' } }
  }

  const data = (await res.json()) as ApiAuthProfileResponse

  return { user: data }
}
