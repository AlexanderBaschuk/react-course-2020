import React, { useState, useEffect, useCallback } from 'react'
import { GameField } from './components/GameField/GameField'
import { useField } from './useField'
import { FieldControls, PlaybackControls } from './components'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
	cellSize: number
	density?: number
}

export const GameOfLife: React.FC<GameOfLifeProps> = ({
	rowCount,
	colCount,
	cellSize,
	density = 0.4,
}) => {
	const { field, reset, resize, changeCell, step } = useField(
		rowCount,
		colCount,
		density,
	)

	const [autoplay, setAutoplay] = useState(false)
	const [animate, setAnimate] = useState(false)

	const toggleAutoplay = useCallback(() => {
		if (!autoplay) {
			setAnimate(true)
			step()
		}
		setAutoplay(!autoplay)
	}, [autoplay, setAutoplay, step])

	const invertCell = useCallback(
		(row: number, col: number) => {
			setAnimate(false)
			changeCell(row, col)
		},
		[changeCell, setAnimate],
	)

	const changeSize = useCallback(
		(rows: number, columns: number) => {
			resize(rows, columns)
		},
		[resize],
	)

	const generateField = useCallback(
		(density: number) => {
			reset(density)
		},
		[reset],
	)

	useEffect(() => {
		if (!autoplay) {
			return
		}

		const timeout = setTimeout(() => {
			step()
		}, 100)
		return () => {
			clearTimeout(timeout)
		}
	}, [autoplay, step])

	return (
		<>
			<FieldControls
				rowCount={rowCount}
				colCount={colCount}
				setSize={changeSize}
				density={density}
				setDensity={generateField}
			/>
			<PlaybackControls
				isPlaying={autoplay}
				step={step}
				togglePlay={toggleAutoplay}
			/>
			<GameField
				field={field}
				cellSize={cellSize}
				clickCell={invertCell}
				animate={animate}
				duration={150}
			/>
		</>
	)
}
