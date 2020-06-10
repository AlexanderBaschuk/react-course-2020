import {
	calculateNextField,
	getInitialState,
	invertOneCell,
	resize as resizeField,
} from './engine'
import { useDispatch, useSelector } from 'react-redux'

import { fieldSelector } from './gameOfLife.selectors'
import { setField } from './gameOfLife.slice'
import { useCallback } from 'react'

interface UseFieldReturnType {
	reset: (density: number) => void
	resize: (rowCount: number, colCount: number) => void
	changeCell: (row: number, col: number) => void
	step: () => void
}

export const useField = (): UseFieldReturnType => {
	const field = useSelector(fieldSelector)
	const dispatch = useDispatch()

	const reset = useCallback(
		(density) => {
			dispatch(setField(getInitialState(field.rowCount, field.colCount, density)))
		},
		[dispatch, field],
	)

	const resize = useCallback(
		(rowCount: number, colCount: number) => {
			dispatch(setField(resizeField(field, rowCount, colCount)))
		},
		[dispatch, field],
	)

	const changeCell = useCallback(
		(row: number, col: number) => {
			const newField = invertOneCell(field, row, col)
			dispatch(setField(newField))
		},
		[dispatch, field],
	)

	const step = useCallback((): void => {
		const newField = calculateNextField(field)
		dispatch((setField(newField)))
	}, [dispatch, field])

	return {
		reset,
		resize,
		changeCell,
		step,
	}
}
