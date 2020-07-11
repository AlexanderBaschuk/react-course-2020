import { homeUrl } from "./testsSetup"

test('redirects to login from home page', async () => {
	await page.goto(homeUrl)
	await expect(page.url()).toMatch(/\/login$/)
	await expect(page).toMatch('Enter your name')
})

