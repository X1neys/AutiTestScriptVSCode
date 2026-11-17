
import { test, expect } from '@playwright/test';

test.describe('EvacFinder Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost/evacfinder-1/');
    });

    // TC01 - Verify login page
    test('Login page loads successfully', async ({ page }) => {
        await expect(page.getByText('Sign In to EvacFinder')).toBeVisible();
    });

    // TC02 - Verify email field
    test('Email field is visible', async ({ page }) => {
        await expect(page.getByLabel('Email')).toBeVisible();
    });

    // TC03 - Verify password field
    test('Password field is visible', async ({ page }) => {
        await expect(page.getByLabel('Password')).toBeVisible();
    });

    // TC04 - Verify Remember Me checkbox
    test('Remember Me checkbox is available', async ({ page }) => {
        await expect(page.getByLabel('Remember me')).toBeVisible();
    });

    // TC05 - Verify Sign In button
    test('Sign In button is available', async ({ page }) => {
        await expect(
            page.getByRole('button', { name: 'Sign In' })
        ).toBeVisible();
    });

});
