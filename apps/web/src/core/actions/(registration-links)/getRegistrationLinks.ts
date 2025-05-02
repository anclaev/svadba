'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

import { formatError } from '@/core/utils'
import { objToQuery } from '@/core/utils/obj-to-query'

import type { GetRegistrationLinks } from '@/core/types/(registration-links)'

export async function getRegistrationLinks(
  dto: GetRegistrationLinks.ActionPayload
): Promise<GetRegistrationLinks.ActionReposnse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.REGISTRATION_LINKS}${objToQuery(dto)}`,
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
