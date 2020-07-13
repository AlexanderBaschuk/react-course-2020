export const homeUrl = 'http://localhost:4444/'

export const logIn = async (username?: string) => {
	await page.goto(homeUrl)
	await page.evaluate((value) => {
		localStorage.setItem('username', value)
	}, username ?? 'Autotest')
	await page.goto(homeUrl)
	await expect(page.url()).toEqual(homeUrl)
}
