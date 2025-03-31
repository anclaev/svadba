'use server'

import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'
import { COOKIES } from '@/core/constants/cookies'

export async function logoutUser(): Promise<boolean> {
  const cookieStore = await cookies()

  const token = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value
  const rtid = cookieStore.get(COOKIES.REFRESH_TOKEN_ID)?.value

  if (!token || !rtid) {
    return false
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_LOGOUT}?rtid=${rtid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          mode: 'cors',
        },
      }
    )

    if (!res.ok) {
      return false
    }

    cookieStore.delete(COOKIES.ACCESS_TOKEN)
    cookieStore.delete(COOKIES.REFRESH_TOKEN)
    cookieStore.delete(COOKIES.REFRESH_TOKEN_ID)

    return true
  } catch {
    return false
  }
}
