'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'
import { formatError } from '@/core/utils'
import { objToQuery } from '@/core/utils/obj-to-query'

import type { GetGuests } from '@/core/types/(guests)'

export async function getGuests(
  dto: GetGuests.ActionPayload
): Promise<GetGuests.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.GUESTS}${objToQuery(dto)}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          mode: 'cors',
        },
      }
    )

    return await res.json()
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
