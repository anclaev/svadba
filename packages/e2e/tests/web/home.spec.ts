import { expect, test } from '@playwright/test'

/**
 * Набор end-to-end тестов для веб-интерфейса (главная страница)
 * @group e2e
 * @category UI
 * @feature Главная страница
 */
test.describe('Тесты веб-интерфейса / Главная страница', () => {
  /**
   * Тест проверки доступности главной страницы
   * @test Проверка отображения главной страницы
   * @param {import('@playwright/test').Page} page - Экземпляр страницы Playwright
   *
   * @scenario
   * 1. Переход на главную страницу ('/')
   * 2. Проверка что заголовок h1 виден в viewport
   *
   * @expected
   * - Страница должна успешно загрузиться
   * - Заголовок первого уровня (h1) должен быть виден пользователю
   *
   * @example
   * // Запуск конкретного теста
   * npx playwright test tests/homepage.spec.ts -g "Главная страница открывается"
   */
  test('Главная страница открывается', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeInViewport()
  })
})
