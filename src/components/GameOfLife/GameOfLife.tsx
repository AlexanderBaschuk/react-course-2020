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
	const [density] = useState(0.4)
	const { field, init, changeCell, step } = useField(rowCount, colCount, density)

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

	const clearField = useCallback(() => {
		init()(rowCount, colCount, 0)
	}, [rowCount, colCount, init])

	const generateField = useCallback(() => {
		init()(rowCount, colCount, density)
	}, [rowCount, colCount, density, init])

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
			<button onClick={clearField}>Clear</button>
			<button onClick={generateField}>Reset</button>
			<button onClick={step}>Step</button>
			<button onClick={toggleAutoplay}>{autoplay ? 'Stop' : 'Start'}</button>
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
