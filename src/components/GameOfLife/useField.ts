import {
	Field,
	calculateNextField,
	getInitialState,
	invertOneCell,
	resize as resizeField,
} from './engine'
import { useCallback, useState } from 'react'

interface UseFieldReturnType {
	field: Field
	reset: (density: number) => void
	resize: (rowCount: number, colCount: number) => void
	changeCell: (row: number, col: number) => void
	step: () => void
}

export const useField = (
	rowCount: number,
	colCount: number,
	density: number,
): UseFieldReturnType => {
	const [field, setField] = useState<Field>(
		getInitialState(rowCount, colCount, density),
	)

	const reset = useCallback(
		(density) => {
			setField(getInitialState(field.rowCount, field.colCount, density))
		},
		[field],
	)

	const resize = useCallback(
		(rowCount: number, colCount: number) => {
			setField(resizeField(field, rowCount, colCount))
		},
		[field],
	)

	const changeCell = useCallback(
		(row: number, col: number) => {
			const newField = invertOneCell(field, row, col)
			setField(newField)
		},
		[field],
	)

	const step = useCallback((): void => {
		const newField = calculateNextField(field)
		setField(newField)
	}, [field])

	return {
		field,
		reset,
		resize,
		changeCell,
		step,
	}
}
