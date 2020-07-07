/*eslint-env node*/
module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
	},
	preset: 'jest-puppeteer',
	testMatch: ['**/e2e-tests/**/?(*.)+(spec|test).[jt]s?(x)'],
	verbose: true,
}
