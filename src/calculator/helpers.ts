import { mathOperators } from './mathOperators'

export const isNumber = (item: string): boolean =>
	item !== null && /\S/.test(item) && !isNaN(Number(item))

export const isOperator = (item: string): boolean => {
	const trimmedItem = item?.trim() ?? ''
	return Object.prototype.hasOwnProperty.call(mathOperators, trimmedItem)
}
