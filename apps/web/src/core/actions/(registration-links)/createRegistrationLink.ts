'use server'

import * as Sentry from '@sentry/nextjs'
import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'
import { HTTP_METHODS } from '@/core/constants/http'

import { formatError, isUndefined } from '@/core/utils'

import type { RegistrationLinkModel } from '@/core/models/(registration-links)'
import type { ApiError, CreateRegistrationLink } from '@/core/types'

export async function createRegistrationLink(
  payload: CreateRegistrationLink.ActionPayload
): Promise<CreateRegistrationLink.ActionResponse> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  const meta = new Map()

  if (payload.login) meta.set('login', payload.login)

  if (payload.name) meta.set('name', payload.name)

  if (!isUndefined(payload.isAdmin))
    meta.set('role', payload.isAdmin ? 'ADMIN' : 'PUBLIC')

  if (payload.guestRole) meta.set('guestRole', payload.guestRole)
  if (payload.guestSide) meta.set('guestSide', payload.guestSide)

  if (payload.initialPassword)
    meta.set('initialPassword', payload.initialPassword)

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.CREATE_REGISTRATION_LINK}`,
      {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...payload,
          expiration: payload.expiration,
          meta: meta.size > 0 ? Object.fromEntries(meta.entries()) : {},
        }),
        mode: 'cors',
      }
    )

    const data = (await res.json()) as CreateRegistrationLink.ApiResponse

    if (!res.ok) {
      return formatError((data as ApiError).message!)
    }

    return { link: data as RegistrationLinkModel }
  } catch (err) {
    Sentry.captureException(err)
    return formatError('Что-то пошло не так. Попробуйте позже.')
  }
}
