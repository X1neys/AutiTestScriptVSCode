// const {test, expect} = require('@playwright/test');
// const {hello, world} = require('./demo/hello');
// console.log(hello());
// console.log(world());   

// import { test, expect } from '@playwright/test';

// test('Accessing Google Site', async ({ page }) => {
//     await page.goto('https://google.com');
//     await expect(page).toHaveTitle('Google');
// });


import { test, expect } from '@playwright/test';

test('Accessing Evacuation Finder System', async ({ page }) => {

    // Open local Evacuation Finder system
    await page.goto('http://localhost/evacfinder-1/');

    // Verify the page loads
    await expect(page).toHaveURL(/evacfinder-1/);

    // Capture screenshot
    await page.screenshot({
        path: 'test-results/evacuation-finder-homepage.png',
        fullPage: true
    });

});
