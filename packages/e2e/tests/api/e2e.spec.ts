import { expect, test } from '@playwright/test'

test.describe('API Endpoints Test', () => {
  test('GET /auth/profile (Пользователь не авторизован)', async ({
    request,
  }) => {
    const res = await request.get('/auth/profile')

    expect(res.status()).toBe(401)
  })
})
