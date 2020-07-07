import { setDefaultOptions } from 'expect-puppeteer'

test('dummy puppeteer test', async () => {
	const url = 'http://localhost:8080'
	await page.goto(url)
	await expect(page.url()).toMatch(/\/login$/)
	await expect(page).toMatch('Enter your name')
})
