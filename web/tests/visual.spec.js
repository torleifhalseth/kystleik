import { test, expect } from '@playwright/test';

test.describe('Homepage - Norwegian', () => {
  test('should load the Norwegian homepage', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to /no/
    await expect(page).toHaveURL(/.*\/no\//);
    
    // Take screenshot of the homepage
    await page.screenshot({ path: 'tests/screenshots/homepage-no.png', fullPage: true });
    
    // Check for key elements
    await expect(page.locator('h2')).toContainText('Kurs og aktiviteter');
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/no/');
    
    // Check for menu button - use more specific selector
    const menuButton = page.locator('button.header-module__TUZVha__toggleNavButton');
    await expect(menuButton).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/navigation-no.png' });
  });
});

test.describe('Homepage - English', () => {
  test('should load the English homepage', async ({ page }) => {
    await page.goto('/en/');
    
    await expect(page).toHaveURL(/.*\/en\//);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/homepage-en.png', fullPage: true });
    
    // Check for key elements
    await expect(page.locator('h2')).toContainText('Courses and Tours');
  });
});

test.describe('Tours List Page', () => {
  test('should load tours list page in Norwegian', async ({ page }) => {
    await page.goto('/no/kurs-og-aktiviteter/');
    
    await expect(page).toHaveURL(/.*\/no\/kurs-og-aktiviteter\//);
    
    // Check for page title - use role-based selector
    await expect(page.getByRole('heading', { name: 'Kurs og aktiviteter', level: 1 })).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/tours-list-no.png', fullPage: true });
  });

  test('should load tours list page in English', async ({ page }) => {
    await page.goto('/en/courses-and-tours/');
    
    await expect(page).toHaveURL(/.*\/en\/courses-and-tours\//);
    
    // Check for page title - use role-based selector
    await expect(page.getByRole('heading', { name: 'Courses and Tours', level: 1 })).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/tours-list-en.png', fullPage: true });
  });
});

test.describe('Layout and Footer', () => {
  test('should display company information in footer', async ({ page }) => {
    await page.goto('/no/');
    
    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for company info
    await expect(footer).toContainText('Kystleik');
    
    // Check for social media links
    await expect(footer.locator('a[href*="facebook"]')).toBeVisible();
    await expect(footer.locator('a[href*="instagram"]')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/footer.png' });
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/no/');
    
    // Menu button should be visible on mobile
    const menuButton = page.locator('button.header-module__TUZVha__toggleNavButton');
    await expect(menuButton).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/mobile-view.png', fullPage: true });
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/no/');
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/tablet-view.png', fullPage: true });
  });

  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/no/');
    
    // Navigation should be visible on desktop
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/desktop-view.png', fullPage: true });
  });
});

test.describe('Language Switching', () => {
  test('should switch from Norwegian to English', async ({ page }) => {
    await page.goto('/no/');
    
    // Click English link
    await page.click('a:has-text("English")');
    
    await expect(page).toHaveURL(/.*\/en\//);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/language-switch-en.png' });
  });

  test('should switch from English to Norwegian', async ({ page }) => {
    await page.goto('/en/');
    
    // Click Norwegian link
    await page.click('a:has-text("Norwegian")');
    
    await expect(page).toHaveURL(/.*\/\//);
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/language-switch-no.png' });
  });
});
