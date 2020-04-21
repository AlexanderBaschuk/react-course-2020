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
	const { field, clear, changeCell, step } = useField(
		rowCount,
		colCount,
	)

	const [autoplay, setAutoplay] = useState(false)

	const toggleAutoplay = useCallback(() => {
		step()
		setAutoplay(!autoplay)
	}, [autoplay, setAutoplay, step])

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
			<GameField field={field} cellSize={cellSize} clickCell={changeCell} />
			<button onClick={clear}>Clear</button>
			<button onClick={step}>Step</button>
			<button onClick={toggleAutoplay}>{autoplay ? 'Stop' : 'Start'}</button>
		</>
	)
}
