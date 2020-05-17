import { FieldControls, PlaybackControls } from './components'
import React, { useCallback, useEffect, useState } from 'react'

import { GameField } from './components/GameField/GameField'
import { useField } from './useField'

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
	const [speed, setSpeed] = useState(100)
	const [animate, setAnimate] = useState(false)

	const toggleAutoplay = useCallback(() => {
		if (!autoplay) {
			setAnimate(true)
			step()
		}
		setAutoplay(!autoplay)
	}, [autoplay, setAutoplay, step])

	const changeSpeed = useCallback(
		(value: number) => {
			console.log(`Changing speed to ${value}`)
			if (value <= 0) return
			setSpeed(1000 / value)
		},
		[],
	)

	const invertCell = useCallback(
		(row: number, col: number) => {
			setAnimate(false)
			changeCell(row, col)
		},
		[changeCell],
	)

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
				density={density}
				setDensity={reset}
			/>
			<PlaybackControls
				isPlaying={autoplay}
				step={step}
				togglePlay={toggleAutoplay}
				setSpeed={changeSpeed}
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
