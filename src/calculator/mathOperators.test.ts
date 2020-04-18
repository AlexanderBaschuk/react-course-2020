import {
	mul,
	div,
	add,
	minus,
	square,
	power,
	fact,
	getMaxPriority,
} from './mathOperators'

describe('mathOperators test cases', () => {
	test('max priority', () => {
		expect(getMaxPriority()).toBe(4)
	})

	test('mul 1 * 2 to equal 2', () => {
		expect(mul(1, 2)).toBe(2)
	})

	test('mul 2 * 2 to equal 4', () => {
		expect(mul(2, 2)).toBe(4)
	})

	test('div 2 / 2 to equal 1', () => {
		expect(div(2, 2)).toBe(1)
	})

	test('div 4 / 2 to equal 2', () => {
		expect(div(4, 2)).toBe(2)
	})

	test('add 4 + 2 to equal 6', () => {
		expect(add(4, 2)).toBe(6)
	})

	test('minus 4 - 2 to equal 2', () => {
		expect(minus(4, 2)).toBe(2)
	})

	test('square 4 should equal 16', () => {
		expect(square(4)).toBe(16)
	})

	test('power 2 to 3 should equal 8', () => {
		expect(power(2, 3)).toBe(8)
	})

	test.each`
		value | result
		${4}  | ${24}
		${1}  | ${1}
		${0}  | ${1}
		${-2} | ${1}
	`('factorial of $value should equal $result', ({ value, result }) => {
		expect(fact(value)).toBe(result)
	})
})
