import { expect, test } from '@playwright/test'

test.describe('Web End-to-End Tests', () => {
  test('Главная страница открывается', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeInViewport()
  })
})
