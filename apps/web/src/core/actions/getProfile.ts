'use server'

import { cookies } from 'next/headers'

import { refreshAuth } from './refreshAuth'

import { API_ENDPOINTS } from '../constants/api-endpoints'
import { COOKIES } from '../constants/cookies'

import { UserModel } from '../models/user.model'

import type { HttpError } from '../types'
import { isNull } from '../utils/funcs'

export async function getProfile(): Promise<UserModel | HttpError | null> {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value

  // Обновление токена
  if (!accessToken) {
    const refreshResult = await refreshAuth()

    if (isNull(refreshResult)) {
      return null
    }

    if (refreshResult.message) {
      return { message: refreshResult.message }
    }

    return refreshResult.user
  }

  // Получение профиля
  const res = await fetch(
    `${process.env.API_URL}${API_ENDPOINTS.AUTH_PROFILE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!res.ok) {
    return { message: 'Что-то пошло не так.' }
  }

  const data = (await res.json()) as UserModel

  return data
}
