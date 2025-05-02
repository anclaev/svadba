'use server'
import * as Sentry from '@sentry/nextjs'

import { cookies } from 'next/headers'

import { COOKIES } from '@/core/constants/cookies'

import { formatError } from '@/core/utils'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { HTTP_METHODS } from '@/core/constants/http'

import type { ApiError, DeleteRegistrationLink } from '@/core/types'

export async function deleteRegistrationLink(
  payload: DeleteRegistrationLink.ActionPayload
): Promise<DeleteRegistrationLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.DELETE_REGISTRATION_LINK}/${payload.id}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        mode: 'cors',
      }
    )

    const data = (await res.json()) as DeleteRegistrationLink.ApiResponse

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    return { status: data as boolean }
  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
