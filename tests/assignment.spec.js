
import { test, expect } from '@playwright/test';

test('Inspect EvacFinder Assignment Dropdowns', async ({ page }) => {

    test.setTimeout(120000);

    // STEP 1 - Open EvacFinder
    await page.goto('http://localhost/evacfinder-1/');

    // STEP 2 - Locate Login Email Field
    const emailField = page.locator('input[type="email"]').first();

    // STEP 3 - Open Login Page if necessary
    if (!(await emailField.isVisible().catch(() => false))) {
        await page.getByText('Login', {
            exact: true
        }).click();
    }

    await emailField.waitFor({
        state: 'visible'
    });

    // STEP 4 - Enter Login Credentials
    await emailField.fill('lancesarmiento40@gmail.com');

    await page.locator('input[type="password"]')
        .fill('123');

    // STEP 5 - Click Sign In
    await page.getByRole('button', {
        name: /sign in/i
    }).click();

    // STEP 6 - Wait for User Access
    await expect(
        page.getByText('User Access', {
            exact: true
        }).first()
    ).toBeVisible({
        timeout: 15000
    });

    // STEP 7 - Navigate to User Access
    await page.getByText('User Access', {
        exact: true
    }).first().click();

    // STEP 8 - Open Assign LGU Officer Panel
    await page.getByRole('button', {
        name: /assign lgu officer/i
    }).click();

    // STEP 9 - Inspect All Dropdowns
    console.log('\n========== ALL DROPDOWNS ==========\n');

    const dropdowns = await page.locator('select').evaluateAll(elements =>
        elements.map((element, index) => ({
            index: index,
            html: element.outerHTML,
            parent: element.parentElement?.outerHTML
        }))
    );

    console.log(
        JSON.stringify(dropdowns, null, 2)
    );

    // STEP 10 - Inspect LGU Officers Label
    console.log('\n========== LGU OFFICERS ==========\n');

    const officerInfo = await page.getByText('LGU Officers (6)', {
        exact: true
    }).evaluate(element => {

        let current = element;
        const parents = [];

        for (let i = 0; i < 5 && current; i++) {
            parents.push(current.outerHTML);
            current = current.parentElement;
        }

        return parents;
    });

    console.log(
        JSON.stringify(officerInfo, null, 2)
    );

    // STEP 11 - Inspect Evacuation Center Label
    console.log('\n========== EVACUATION CENTER ==========\n');

    const centerInfo = await page.getByText('Evacuation Center', {
        exact: true
    }).evaluate(element => {

        let current = element;
        const parents = [];

        for (let i = 0; i < 5 && current; i++) {
            parents.push(current.outerHTML);
            current = current.parentElement;
        }

        return parents;
    });

    console.log(
        JSON.stringify(centerInfo, null, 2)
    );

    // STEP 12 - Capture Screenshot
    await page.screenshot({
        path: 'test-results/dropdown-inspection.png',
        fullPage: true
    });

    console.log('\nDropdown inspection completed.');

    // STEP 13 - Keep Browser Open
    await page.pause();

});
