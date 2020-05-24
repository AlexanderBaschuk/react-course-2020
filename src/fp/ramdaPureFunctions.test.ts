import {
	QsObj,
	Team,
	addQuestion,
	createQs,
	getHigherTeam,
	getKeyValueString,
	getKeyValueStrings,
	getName,
	getTopName,
	getTopTeam,
	joinWithAmp,
	parseQs,
	splitToKeyValuePairs,
} from './ramdaPureFunctions'

describe('teams', () => {
	test('getName', () => {
		const team = { name: 'Dogs', score: 8 }
		expect(getName(team)).toBe('Dogs')
	})

	test('getHigherTeam', () => {
		const winnerTeam = { name: 'Tigers', score: 4 }
		const loserTeam = { name: 'Monkeys', score: 2 }
		expect(getHigherTeam(loserTeam, winnerTeam)).toBe(winnerTeam)
	})

	test('getTopTeam', () => {
		const teams: Team[] = [
			{ name: 'Lions', score: 5 },
			{ name: 'Tigers', score: 4 },
			{ name: 'Bears', score: 6 },
			{ name: 'Monkeys', score: 2 },
		]
		expect(getTopTeam(teams)).toEqual({ name: 'Bears', score: 6 })
	})

	test('getTopName', () => {
		const teams: Team[] = [
			{ name: 'Lions', score: 5 },
			{ name: 'Tigers', score: 4 },
			{ name: 'Bears', score: 6 },
			{ name: 'Monkeys', score: 2 },
		]

		expect(getTopName(teams)).toBe('Bears')
	})
})

describe('createQs', () => {
	test('joinWithAmp', () => {
		expect(joinWithAmp(['a', 'bc', '123'])).toBe('a&bc&123')
	})

	test('addQuestion', () => {
		expect(addQuestion('abc123')).toBe('?abc123')
	})

	test('getKeyValueString', () => {
		expect(getKeyValueString(['a', 1])).toBe('a=1')
	})

	test('getKeyValueStrings', () => {
		expect(
			getKeyValueStrings([
				['a', 1],
				['b', 'B'],
				['c', 3],
			]),
		).toStrictEqual(['a=1', 'b=B', 'c=3'])
	})

	test('createQs', () => {
		const qsObj: QsObj = {
			page: '2',
			pageSize: '10',
			total: '205',
			somethingElse: 'value',
		}

		expect(createQs(qsObj)).toBe(
			'?page=2&pageSize=10&total=205&somethingElse=value',
		)
	})
})

test('parseQs', () => {
	const qs = '?page=2&pageSize=10&total=205&somethingElse=value'

	expect(parseQs(qs)).toEqual({
		page: '2',
		pageSize: '10',
		total: '205',
		somethingElse: 'value',
	})
})
