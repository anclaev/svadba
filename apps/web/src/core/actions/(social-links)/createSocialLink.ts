'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'
import { HTTP_METHODS } from '@/core/constants/http'

import { formatError } from '@/core/utils'

import type { SocialLinkModel } from '@/core/models'
import type { ApiError, CreateSocialLink } from '@/core/types'

export async function createSocialLink(
  payload: CreateSocialLink.ActionPayload
): Promise<CreateSocialLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  // TODO: Обработка обновления токена в перехватчик

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.CREATE_SOCIAL_LINK}`,
      {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...payload,
          icon: payload.icon.trim() !== '' ? payload.icon : undefined,
        }),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as CreateSocialLink.ApiResponse

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
