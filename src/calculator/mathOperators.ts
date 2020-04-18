export type BinaryOperation = (first: number, second: number) => number
export type UnaryOperation = (value: number) => number
export enum OperationType {
	// eslint-disable-next-line no-unused-vars
	Binary,
	// eslint-disable-next-line no-unused-vars
	Unary,
}
interface BinaryOperator {
	key: string
	priority: number
	operationType: OperationType.Binary
	operation: BinaryOperation
}

interface UnaryOperator {
	key: string
	priority: number
	operationType: OperationType.Unary
	operation: UnaryOperation
}

export function isBinary(operator: MathOperator): operator is BinaryOperator {
	return operator.operationType === OperationType.Binary
}

export function isUnary(operator: MathOperator): operator is UnaryOperator {
	return operator.operationType === OperationType.Unary
}

export type MathOperator = BinaryOperator | UnaryOperator

export const mul: BinaryOperation = (first: number, second: number): number =>
	first * second

export const div: BinaryOperation = (first: number, second: number): number =>
	first / second

export const add: BinaryOperation = (first: number, second: number): number =>
	first + second

export const minus: BinaryOperation = (first: number, second: number): number =>
	first - second

export const fact: UnaryOperation = (value: number): number => {
	let result = 1
	for (let i = 2; i <= value; i++) {
		result *= i
	}
	return result
}

export const square: UnaryOperation = (value: number): number =>
	Math.pow(value, 2)

export const power: BinaryOperation = (first: number, second: number): number =>
	Math.pow(first, second)

export const mathOperators: { [key: string]: MathOperator } = {
	'!': {
		key: '!',
		priority: 1,
		operationType: OperationType.Unary,
		operation: fact,
	},
	'**': {
		key: '**',
		priority: 1,
		operationType: OperationType.Unary,
		operation: square,
	},
	'^': {
		key: '^',
		priority: 2,
		operationType: OperationType.Binary,
		operation: power,
	},
	'*': {
		key: '*',
		priority: 3,
		operationType: OperationType.Binary,
		operation: mul,
	},
	'/': {
		key: '/',
		priority: 3,
		operationType: OperationType.Binary,
		operation: div,
	},
	'+': {
		key: '+',
		priority: 4,
		operationType: OperationType.Binary,
		operation: add,
	},
	'-': {
		key: '-',
		priority: 4,
		operationType: OperationType.Binary,
		operation: minus,
	},
}

export const getMaxPriority = (): number => {
	const priorities = Object.entries(mathOperators).map(
		([, value]) => value.priority,
	)
	return Math.max(...priorities)
}
