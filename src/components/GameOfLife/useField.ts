import { useState, useCallback } from 'react'
import {
	// eslint-disable-next-line no-unused-vars
	Field,
	getInitialState,
	calculateNextField,
	invertOneCell,
} from './engine'

interface UseFieldreturnType {
	field: Field
	clear: () => void
	changeCell: (row: number, col: number) => void
	step: () => void
}

export const useField = (
	rowCount: number,
	colCount: number,
): UseFieldreturnType => {
	const [field, setField] = useState<Field>(getInitialState(rowCount, colCount))

	const clear = useCallback(() => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount, setField])

	const changeCell = (row: number, col: number) => {
		const newField = invertOneCell(field, row, col)
		setField(newField)
	}

	const step = useCallback((): void => {
		const newField = calculateNextField(field)
		setField(newField)
	}, [field, setField])

	return {
		field,
		clear,
		changeCell,
		step,
	}
}
