// Задание 1
export type Team = { name: string; score: number }

export const getTopName = (teams: Team[]): string =>
	teams.reduce((prev, current) => (prev.score > current.score ? prev : current))
		.name

// Задание 2
export type QsValue = string | number | boolean | object
export type QsObj = Record<string, QsValue>

export const createQs = (qsObj: QsObj): string =>
	'?' +
	Object.entries(qsObj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')

const toKeyValue = (keyValue: string): [string, QsValue] => {
	const [key, value] = keyValue.split('=')
	return [key, value]
}

// Задание 3
export const parseQs = (qs: string): QsObj => {
	const entries = qs
		.replace('?', '')
		.trim()
		.split('&')
		.map((keyValueString) => toKeyValue(keyValueString))

	const resultQueryObject = entries.reduce((result, [key, value]) => {
		result[key] = value
		return result
	}, {})
	return resultQueryObject as QsObj
}
