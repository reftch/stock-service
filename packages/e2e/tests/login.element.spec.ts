import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {

  test.beforeEach(async ({ browser, page, isMobile }) => {

    await page.goto('https://localhost:3000/stock-service')
  });

  test('should has title and submit button', async ({ page }) => {
    // Expect a title
    await expect(page).toHaveTitle('Stock Service');

    const login = page.getByTestId('login-element');
    await expect(login).toBeVisible()

    // create a title locator
    const locator = page.getByTestId('title')
    await expect(locator).toBeVisible()
    await expect(locator).toHaveText('Please login')
    await expect(locator).toHaveClass('form-signin-heading')

    // submit button
    let submit = page.getByTestId('submit-btn');
    await expect(submit).toHaveAttribute('type', 'submit');
  });


})
