'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'
import { HTTP_METHODS } from '../constants/http'

import { formatError } from '../utils'

import type { SocialLinkModel } from '../models/social-link.model'
import type { ApiError } from '../types'
import type { UpdateSocialLink } from '../types/update-social-link'

export async function updateSocialLink(
  payload: UpdateSocialLink.ActionPayload
): Promise<UpdateSocialLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value
  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.UPDATE_SOCIAL_LINK}/${payload.id}`,
      {
        method: HTTP_METHODS.PUT,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload.data),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as UpdateSocialLink.ApiResponse

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    return { link: data as SocialLinkModel }
  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
