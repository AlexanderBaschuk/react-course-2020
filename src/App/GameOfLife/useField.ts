import {
	changeCell,
	resetAction,
	resizeAction,
	setAutoplay,
	setSpeed,
	stepAction,
} from './gameOfLife.slice'

import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

interface UseFieldReturnType {
	reset: (density: number) => void
	resize: (rowCount: number, colCount: number) => void
	step: () => void
	toggleAutoplay: () => void
	changeSpeed: (value: number) => void
	invertCell: (row: number, col: number) => void
}

export const useField = (): UseFieldReturnType => {
	const dispatch = useDispatch()

	const reset = useCallback(
		(density) => {
			dispatch(resetAction(density))
		},
		[dispatch],
	)

	const resize = useCallback(
		(rowCount: number, colCount: number) => {
			dispatch(resizeAction({ rowCount, colCount }))
		},
		[dispatch],
	)

	const step = useCallback((): void => {
		dispatch(stepAction())
	}, [dispatch])

	const toggleAutoplay = useCallback(() => {
		dispatch(setAutoplay())
	}, [dispatch])

	const changeSpeed = useCallback(
		(value: number) => {
			dispatch(setSpeed(1000 / value))
		},
		[dispatch],
	)

	const invertCell = useCallback(
		(row: number, col: number) => {
			dispatch(changeCell({ row, col }))
		},
		[dispatch],
	)

	return {
		reset,
		resize,
		step,
		toggleAutoplay,
		changeSpeed,
		invertCell,
	}
}
