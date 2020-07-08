/*eslint-env node*/
module.exports = {
	launch: {
		dumpio: true,
		headless: false,
		sloMo: 250,
	},
	server: {
		command: 'npm run start-server-e2e',
		launchTimeout: 30000,
	},
}
