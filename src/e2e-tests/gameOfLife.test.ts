import { setDefaultOptions } from 'expect-puppeteer'

test('dummy puppeteer test', async () => {
	const url = 'http://localhost:4444'
	await page.goto(url, { timeout: 20000 })
	await expect(page.url()).toMatch(/\/login$/, {timeout: 10001})
	await expect(page).toMatch('Enter your name', {timeout: 10002})
}, 30000)
