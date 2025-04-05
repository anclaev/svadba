'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'

import { formatError } from '../utils'
import { objToQuery } from '../utils/obj-to-query'

import type { GetSocialLinks } from '../types'

export async function getSocialLinks(
  dto: GetSocialLinks.ActionPayload
): Promise<GetSocialLinks.ActionResponse> {
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
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
