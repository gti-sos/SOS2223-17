 //@ts-check
  import { test, expect } from '@playwright/test';

  test('has at least one dataCall', async ({ page }) => {
    await page.goto('localhost:8080');

    await page.getByRole('link', { name: 'Llamadas emergencia'}).click();

    await new Promise(resolve => setTimeout(resolve, 1000));
    // Expect a title "to contain" a substring.
    await expect((await page.locator(".dataCall").all()).length).toBeGreaterThan(0);
  });

