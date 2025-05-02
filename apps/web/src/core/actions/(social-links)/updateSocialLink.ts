'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'
import { HTTP_METHODS } from '@/core/constants/http'

import { formatError } from '@/core/utils'

import type { SocialLinkModel } from '@/core/models/social-link.model'
import type { ApiError, UpdateSocialLink } from '@/core/types'

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
        body: JSON.stringify({
          ...payload.data,
          icon: payload.data.icon.trim() !== '' ? payload.data.icon : undefined,
        }),
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
