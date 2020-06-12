import { FieldControls, PlaybackControls } from './components'
import React, { useEffect } from 'react'
import { autoplaySelector, densitySelector } from './gameOfLife.selectors'
import { useDispatch, useSelector } from 'react-redux'

import { GameField } from './components/GameField/GameField'
import { getInitialState } from './engine'
import { setField } from './gameOfLife.slice'
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
	const {
		reset,
		resize,
		step,
		toggleAutoplay,
		changeSpeed,
		invertCell,
	} = useField()

	const dispatch = useDispatch()
	const autoplay = useSelector(autoplaySelector)
	const density = useSelector(densitySelector)

	useEffect(() => {
		dispatch(setField(getInitialState(rowCount, colCount, density)))
	}, [])

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
