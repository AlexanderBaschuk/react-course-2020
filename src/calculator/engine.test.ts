import { calcByPriority } from './engine'

describe('Priority 3 simple cases', () => {
	test('[1 * 32]', () => {
		expect(calcByPriority([1, '*', 32], 3)).toEqual([32])
	})

	test('[32 / 32]', () => {
		expect(calcByPriority([32, '/', 32], 3)).toEqual([1])
	})

	test('[32 + 32]', () => {
		expect(calcByPriority([32, '+', 32], 3)).toEqual([32, '+', 32])
	})
})

describe('Priority 3 mixed with priority 4 cases', () => {
	test('[32 / 32 + 10 * 10]', () => {
		expect(calcByPriority([32, '/', 32, '+', 10, '*', 10], 3)).toEqual([
			1,
			'+',
			100,
		])
	})
})

describe('Priority 4 invalid cases', () => {
	test('[32 / 32]', () => {
		expect(() => calcByPriority([32, '/', 32], 4)).toThrow(
			/Stack contains operator '\/' with incorrect priority/,
		)
	})
})

describe('Priority 4 simple cases', () => {
	test('[32 + 32]', () => {
		expect(calcByPriority([32, '+', 32], 4)).toEqual([64])
	})

	test('[32 - 32]', () => {
		expect(calcByPriority([32, '-', 32], 4)).toEqual([0])
	})

	test('[32 - 32 + 10]', () => {
		expect(calcByPriority([32, '-', 32, '+', 10], 4)).toEqual([10])
	})
})

describe('Unary operators priority 1', () => {
	test.each`
		value                        | result
		${[4, '!']}                  | ${[24]}
		${[3, '**']}                 | ${[9]}
		${[2, '**', '**']}           | ${[16]}
		${[3, '!', '!']}             | ${[720]}
		${[3, '!', '**']}            | ${[36]}
		${[2, '**', '!']}            | ${[24]}
		${[3, '!', '^', 2]}          | ${[6, '^', 2]}
		${[4, '!', '+', 1]}          | ${[24, '+', 1]}
		${[2, '*', 4, '!']}          | ${[2, '*', 24]}
		${[4, '!', '-', 3, '**']}    | ${[24, '-', 9]}
		${[2, '*', 3, '**', '+', 1]} | ${[2, '*', 9, '+', 1]}
		${[2, '^', 3, '!']}          | ${[2, '^', 6]}
		${[2, '^', 3]}               | ${[2, '^', 3]}
		${[1, '+', 2, '*', 3]}       | ${[1, '+', 2, '*', 3]}
		${[1, '*', 2, '^', 3]}       | ${[1, '*', 2, '^', 3]}
	`('$value => $result', ({ value, result }) => {
		expect(calcByPriority(value, 1)).toEqual(result)
	})

	describe('Operators priority 2', () => {
		test.each`
			value                          | result
			${[2, '^', 3]}                 | ${[8]}
			${[1, '+', 2, '^', 3, '/', 2]} | ${[1, '+', 8, '/', 2]}
		`('$value => $result', ({ value, result }) => {
			expect(calcByPriority(value, 2)).toEqual(result)
		})
	})
})
