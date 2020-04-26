import React, { useState, useEffect, useCallback } from 'react'
import { GameField } from './components/GameField/GameField'
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
	const { field, clear, changeCell, step } = useField(rowCount, colCount)

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

	useEffect(() => {
		if (!autoplay) {
			return
		}

		const timeout = setTimeout(() => {
			step()
		}, 300)
		return () => {
			clearTimeout(timeout)
		}
	}, [autoplay, step])

	return (
		<>
			<GameField
				field={field}
				cellSize={cellSize}
				clickCell={invertCell}
				animate={animate}
				duration={500}
			/>
			<button onClick={clear}>Clear</button>
			<button onClick={step}>Step</button>
			<button onClick={toggleAutoplay}>{autoplay ? 'Stop' : 'Start'}</button>
		</>
	)
}
