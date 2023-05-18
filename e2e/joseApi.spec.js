//@ts-check
import { test, expect } from'@playwright/test';

test('get self-employed stats link', async ({ page }) => {
    await page.goto('https://sos2223-17.appspot.com/self-employed-stats');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Estadísticas autonomos' }).click();
  
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*self-employed-stats/);
  });