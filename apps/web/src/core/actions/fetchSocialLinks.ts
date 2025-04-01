'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'
import { objToQuery } from '../utils/obj-to-query'

import type { PaginationDto } from '../dtos/pagination.dto'
import type { FetchSocialLinksActionResponse } from '../types/actions-responses'

export async function fetchSocialLinks(
  dto: PaginationDto
): Promise<FetchSocialLinksActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.LINKS}${objToQuery(dto)}`,
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
    return { error: { message: 'Что-то пошло не так, попробуйте позже.' } }
  }
}
