import { parser } from './parser'

import { calcByPriority } from './engine'
import { getMaxPriority } from './mathOperators'

export const runner = (line: string): number => {
	let stack = parser(line)

	if (stack === null) {
		throw new TypeError('Unexpected string')
	}

	for (let i = 1; i <= getMaxPriority(); i++) {
		stack = calcByPriority(stack, i)

		if (stack.length === 1) {
			return Number(stack[0])
		}
	}

	throw new Error(
		`Calculation didn't finish after all rounds. Current stack: [${stack}]`,
	)
}
