import React, { useState, useEffect, useCallback } from 'react'
import {
	getInitialState,
	invertOneCell,
	calculateNextField,
	// eslint-disable-next-line no-unused-vars
	Field,
} from './engine'
import { GameField } from './components/GameField/GameField'

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
	const [field, setField] = useState<Field>({
		cells: [],
		rowCount: 0,
		colCount: 0,
	})

	const [autoplay, setAutoplay] = useState(false)

	const playOneStep = useCallback(() => {
		const newField = calculateNextField(field)
		setField(newField)
	}, [field])

	const clear = useCallback((): void => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	const toggleAutoplay = useCallback(() => {
		playOneStep()
		setAutoplay(!autoplay)
	}, [autoplay, setAutoplay, playOneStep])

	useEffect(() => {
		clear()
	}, [clear])

	useEffect(() => {
		if (!autoplay) {
			return
		}

		const timeout = setTimeout(() => {
			playOneStep()
		}, 300)
		return () => {
			clearTimeout(timeout)
		}
	}, [autoplay, playOneStep])

	const changeCell = (row: number, col: number) => {
		const newField = invertOneCell(field, row, col)
		setField(newField)
	}

	return (
		<>
			<GameField field={field} cellSize={cellSize} clickCell={changeCell} />
			<button onClick={clear}>Clear</button>
			<button onClick={playOneStep}>Step</button>
			<button onClick={toggleAutoplay}>{autoplay ? 'Stop' : 'Start'}</button>
		</>
	)
}
