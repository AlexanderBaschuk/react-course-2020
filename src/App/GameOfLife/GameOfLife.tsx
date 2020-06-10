import { FieldControls, PlaybackControls } from './components'
import React, { useCallback, useEffect } from 'react'
import {
	autoplaySelector,
	densitySelector,
	speedSelector,
} from './gameOfLife.selectors'
import { setAutoplay, setField, setSpeed } from './gameOfLife.slice'
import { useDispatch, useSelector } from 'react-redux'

import { GameField } from './components/GameField/GameField'
import { getInitialState } from './engine'
import { useField } from './useField'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
	cellSize: number
}

export const GameOfLife: React.FC<GameOfLifeProps> = ({
	rowCount,
	colCount,
	cellSize,
}) => {
	const { reset, resize, changeCell, step } = useField()

	const dispatch = useDispatch()
	const autoplay = useSelector(autoplaySelector)
	const speed = useSelector(speedSelector)
	const density = useSelector(densitySelector)

	const toggleAutoplay = useCallback(() => {
		if (!autoplay) {
			step()
		}
		dispatch(setAutoplay(!autoplay))
	}, [autoplay, dispatch, step])

	const changeSpeed = useCallback(
		(value: number) => {
			dispatch(setSpeed(1000 / value))
		},
		[dispatch],
	)

	const invertCell = useCallback(
		(row: number, col: number) => {
			changeCell(row, col)
		},
		[changeCell],
	)

	useEffect(() => {
		dispatch(setField(getInitialState(rowCount, colCount, density)))
	}, [])

	useEffect(() => {
		if (!autoplay) {
			return
		}

		const timeout = setTimeout(() => {
			step()
		}, speed)
		return () => {
			clearTimeout(timeout)
		}
	}, [autoplay, step, speed])

	return (
		<>
			<FieldControls
				rowCount={rowCount}
				colCount={colCount}
				setSize={resize}
				setDensity={reset}
			/>
			<PlaybackControls
				isPlaying={autoplay}
				step={step}
				togglePlay={toggleAutoplay}
				setSpeed={changeSpeed}
			/>
			<GameField cellSize={cellSize} clickCell={invertCell} />
		</>
	)
}
