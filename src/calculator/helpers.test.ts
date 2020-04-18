import { isNumber, isOperator } from './helpers'

describe('isNumber', () => {
	test.each`
		value        | expectedResult
		${42}        | ${true}
		${0}         | ${true}
		${-1}        | ${true}
		${'abc'}     | ${false}
		${undefined} | ${false}
		${null}      | ${false}
		${''}        | ${false}
		${' '}       | ${false}
	`(
		'isNumber($value) should be $expectedResult',
		({ value, expectedResult }) => {
			expect(isNumber(value)).toBe(expectedResult)
		},
	)

	test.each`
		value        | expectedResult
		${'+'}       | ${true}
		${'-'}       | ${true}
		${'*'}       | ${true}
		${'/'}       | ${true}
		${'^'}       | ${true}
		${'**'}      | ${true}
		${'!'}       | ${true}
		${'  + '}    | ${true}
		${'5'}       | ${false}
		${'-1'}      | ${false}
		${'&'}       | ${false}
		${''}        | ${false}
		${' '}       | ${false}
		${null}      | ${false}
		${undefined} | ${false}
	`(
		'isOperator($value) should be $expectedResult',
		({ value, expectedResult }) => {
			expect(isOperator(value)).toBe(expectedResult)
		},
	)
})
