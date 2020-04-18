// eslint-disable-next-line no-unused-vars
import { ParsedLineType } from './parser'
import { isOperator, isNumber } from './helpers'
import { mathOperators, isBinary, isUnary } from './mathOperators'

function applyUnaryOperator(
	stack: ParsedLineType,
	priority: number,
): ParsedLineType {
	const topItem = stack[stack.length - 1]
	const prevItem = stack[stack.length - 2]
	const operator = mathOperators[String(topItem)]
	const operand = Number(prevItem)

	if (!isUnary(operator)) {
		throw new Error(
			`Can't apply operator '${operator.key}' as unary operator for operand '${operand}'.`,
		)
	}

	if (operator.priority < priority) {
		throw new TypeError(
			`Stack contains operator '${operator.key}' with incorrect priority: ${operator.priority}. Currently applying priority ${priority}.`,
		)
	}

	if (operator.priority > priority) {
		return stack
	}

	return [...stack.slice(0, -2), operator.operation(operand)]
}

function applyBinaryOperator(
	stack: ParsedLineType,
	priority: number,
): ParsedLineType {
	const rightItem = stack[stack.length - 1]
	const middleItem = stack[stack.length - 2]
	const leftItem = stack[stack.length - 3]
	const operator = mathOperators[String(middleItem)]
	const leftOperand = Number(leftItem)
	const rightOperand = Number(rightItem)

	if (!isBinary(operator)) {
		throw new Error(
			`Can't apply operator '${operator.key}' as biary operator for operands '${leftOperand}' and '${rightOperand}'.`,
		)
	}

	if (operator.priority < priority) {
		throw new TypeError(
			`Stack contains operator '${operator.key}' with incorrect priority: ${operator.priority}. Currently applying priority ${priority}.`,
		)
	}

	if (operator.priority > priority) {
		return stack
	}

	return [...stack.slice(0, -3), operator.operation(leftOperand, rightOperand)]
}

export const calcByPriority = (
	stack: ParsedLineType,
	priority: number,
): ParsedLineType => {
	return stack.reduce<ParsedLineType>((result, nextItem) => {
		const newStack = [...result, nextItem]
		const topItem = String(newStack[newStack.length - 1])
		const prevItem = String(newStack[newStack.length - 2])
		const thirdItem = String(newStack[newStack.length - 3])

		if (
			isNumber(prevItem) &&
			isOperator(topItem) &&
			isUnary(mathOperators[topItem])
		) {
			return applyUnaryOperator(newStack, priority)
		}

		if (
			isNumber(thirdItem) &&
			isOperator(prevItem) &&
			isBinary(mathOperators[prevItem]) &&
			isNumber(topItem)
		) {
			return applyBinaryOperator(newStack, priority)
		}

		return newStack
	}, [])
}
