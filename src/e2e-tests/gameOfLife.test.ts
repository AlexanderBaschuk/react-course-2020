const homeUrl = 'http://localhost:4444'

const setupLogin = async (username: string) => {
	await page.evaluate((value) => {
		localStorage.setItem('username', value)
	}, username ?? 'Autotest')
}

test('redirects to login from home page', async () => {
	await page.goto(homeUrl)
	await expect(page.url()).toMatch(/\/login$/)
	await expect(page).toMatch('Enter your name')
})

test('stays on homepage when has username in localStorage', async () => {
	await setupLogin('John')
	await page.goto(homeUrl)
	await expect(page.url()).not.toMatch(/\/login$/)
	await expect(page).toMatch('Hello, John')
})
