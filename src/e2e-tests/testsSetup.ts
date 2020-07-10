export const homeUrl = 'http://localhost:4444'

export const setupLogin = async (username: string) => {
	await page.evaluate((value) => {
		localStorage.setItem('username', value)
	}, username ?? 'Autotest')
}
