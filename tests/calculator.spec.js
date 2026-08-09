const { test, expect } = require('@playwright/test');

const URL = 'http://127.0.0.1:5500/calculator.html';

async function clickNumber(page, number) {
    for (const digit of String(number)) {
        await page.getByRole('button', { name: digit }).click();
    }
}

test('Addition', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 125);
    await page.locator('#plus').click();
    await clickNumber(page, 375);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('500');
});

test('Subtraction', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 25);
    await page.locator('#minus').click();
    await clickNumber(page, 40);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('-15');
});

test('Multiplication', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 12);
    await page.locator('#multiply').click();
    await clickNumber(page, 8);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('96');
});

test('Division', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 100);
    await page.locator('#divide').click();
    await clickNumber(page, 4);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('25');
});

test('Decimal calculation', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#decimal').click();
    await clickNumber(page, 5);

    await page.locator('#plus').click();

    await clickNumber(page, 2);
    await page.locator('#decimal').click();
    await clickNumber(page, 5);

    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('8');
});

test('Negative result', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#minus').click();
    await clickNumber(page, 8);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('-3');
});

test('Plus minus button', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#sign').click();

    await expect(page.locator('#display')).toHaveText('-5');
});

test('Percentage', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 200);
    await page.locator('#percent').click();

    await expect(page.locator('#display')).toHaveText('2');
});

test('Division by zero', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 10);
    await page.locator('#divide').click();
    await clickNumber(page, 0);
    await page.locator('#equals').click();

    await expect(page.locator('#display'))
        .toHaveText('Cannot divide by 0');
});

test('Operator switching', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#plus').click();
    await page.locator('#minus').click();
    await clickNumber(page, 2);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('3');
});

test('Three number calculation', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#plus').click();
    await clickNumber(page, 2);
    await page.locator('#plus').click();
    await clickNumber(page, 3);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('10');
});

test('Repeated equals', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#plus').click();
    await clickNumber(page, 2);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('7');

    await page.locator('#equals').click();
    await expect(page.locator('#display')).toHaveText('9');

    await page.locator('#equals').click();
    await expect(page.locator('#display')).toHaveText('11');
});

test('Operator after equals', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#plus').click();
    await clickNumber(page, 2);
    await page.locator('#equals').click();

    await page.locator('#plus').click();
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('14');
});

test('Operator after equals with new number', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 7);
    await page.locator('#plus').click();
    await clickNumber(page, 2);
    await page.locator('#equals').click();

    await page.locator('#plus').click();
    await clickNumber(page, 2);
    await page.locator('#equals').click();

    await expect(page.locator('#display')).toHaveText('11');
});

test('Backspace', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 123);
    await page.locator('#del').click();

    await expect(page.locator('#display')).toHaveText('12');
});

test('Backspace to zero', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 5);
    await page.locator('#del').click();

    await expect(page.locator('#display')).toHaveText('0');
});

test('AC clears calculator', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, 123);
    await page.locator('#plus').click();
    await clickNumber(page, 456);

    await page.locator('#clear').click();

    await expect(page.locator('#display')).toHaveText('0');
});

test('Keyboard input', async ({ page }) => {
    await page.goto(URL);

    await page.keyboard.type('5+2');
    await page.keyboard.press('Enter');

    await expect(page.locator('#display')).toHaveText('7');
});

test('Keyboard decimal', async ({ page }) => {
    await page.goto(URL);

    await page.keyboard.type('5.5+2.5');
    await page.keyboard.press('Enter');

    await expect(page.locator('#display')).toHaveText('8');
});

test('Keyboard Backspace', async ({ page }) => {
    await page.goto(URL);

    await page.keyboard.type('123');
    await page.keyboard.press('Backspace');

    await expect(page.locator('#display')).toHaveText('12');
});

test('Keyboard Escape clears calculator', async ({ page }) => {
    await page.goto(URL);

    await page.keyboard.type('123');
    await page.keyboard.press('Escape');

    await expect(page.locator('#display')).toHaveText('0');
});

test('Maximum input length', async ({ page }) => {
    await page.goto(URL);

    await clickNumber(page, '123456789012345');

    await expect(page.locator('#display')).toHaveText('1234567890123');
});
