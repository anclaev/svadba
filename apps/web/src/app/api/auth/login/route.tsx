import { cookies } from 'next/headers'

import { API_ENDPOINTS } from '@/core/constants/api-endpoints'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const formData = await request.formData()
  const payload = Object.fromEntries(formData.entries())

  try {
    const res = await fetch(
      `${process.env.API_URL}${API_ENDPOINTS.AUTH_LOGIN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const json = await res.json()

    // if(res.ok) {
    //     cookieStore.set('token', json.data.)
    // }
  } catch {}
}
