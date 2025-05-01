'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'
import { HTTP_METHODS } from '@/core/constants/http'

import { formatError, isUndefined } from '@/core/utils'

import type { RegistrationLinkModel } from '@/core/models/(registration-links)'
import type { ApiError, UpdateRegistrationLink } from '@/core/types'

export async function updateRegistrationLink(
  payload: UpdateRegistrationLink.ActionPayload
): Promise<UpdateRegistrationLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  const meta = new Map()

  if (payload.data.login) meta.set('login', payload.data.login)

  if (payload.data.name) meta.set('name', payload.data.name)

  if (!isUndefined(payload.data.isAdmin))
    meta.set('role', payload.data.isAdmin ? 'ADMIN' : 'PUBLIC')

  if (payload.data.guestRole) meta.set('guestRole', payload.data.guestRole)
  if (payload.data.guestSide) meta.set('guestSide', payload.data.guestSide)

  if (payload.data.initialPassword)
    meta.set('initialPassword', payload.data.initialPassword)

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.UPDATE_REGISTRATION_LINK}/${payload.id}`,
      {
        method: HTTP_METHODS.PUT,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...payload.data,
          expiresAt: payload.data.expiresAt,
          isActive: payload.data.isActive,
          meta: meta.size > 0 ? Object.fromEntries(meta.entries()) : {},
        }),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as UpdateRegistrationLink.ApiResponse

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    return { link: data as RegistrationLinkModel }
  } catch (err) {
    console.log(err)
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
