import { isNumber, isOperator } from './helpers'

export type ParsedLineType = (number | string)[]

export const parser = (line: string): ParsedLineType | null => {
	const stack = line.split(' ')

	return stack.map((item) => {
		if (isNumber(item)) {
			return Number(item)
		}
		if (isOperator(item)) {
			return item
		}
		throw new TypeError('Unexpected string')
	})
}
