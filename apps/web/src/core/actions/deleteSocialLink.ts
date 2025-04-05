'use server'
import * as Sentry from '@sentry/nextjs'

import { cookies } from 'next/headers'

import { COOKIES } from '../constants/cookies'

import { formatError } from '../utils'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { HTTP_METHODS } from '../constants/http'

import type { ApiError, DeleteSocialLink } from '../types'

export async function deleteSocialLink(
  payload: DeleteSocialLink.ActionPayload
): Promise<DeleteSocialLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.DELETE_SOCIAL_LINK}/${payload.id}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        mode: 'cors',
      }
    )

    const data = (await res.json()) as DeleteSocialLink.ApiResponse

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
