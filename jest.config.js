/*eslint-env node*/
module.exports = {
	clearMocks: true,
	coverageDirectory: "coverage",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jestSettings.js"],
	transform: {
	  "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
	},
  }
