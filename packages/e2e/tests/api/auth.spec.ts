import { expect, test } from '@playwright/test'

/**
 * Набор e2e-тестов для проверки эндпойнтов API (/auth)
 * @group e2e
 * @category API
 * @feature /auth
 */
test.describe('Тесты эндпойнтов API - /auth', () => {
  /**
   * Тест для проверки доступа к профилю без авторизации
   * @test GET /auth/profile (Неавторизованный доступ)
   * @param {import('@playwright/test').APIRequestContext} request - Контекст запроса Playwright
   *
   * @example
   * // Пример выполнения теста
   * npx playwright test tests/auth.spec.ts
   *
   * @description
   * Проверяет что:
   * 1. Неавторизованный запрос к /auth/profile
   * 2. Возвращает статус 401 (Unauthorized)
   *
   * @expected
   * - Статус ответа должен быть 401
   * - Тело ответа может содержать сообщение об ошибке (не проверяется в этом тесте)
   */

  test('GET /auth/profile (Пользователь не авторизован)', async ({
    request,
  }) => {
    const res = await request.get('/auth/profile')

    expect(res.status()).toBe(401)
  })
})
