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

	const clear = useCallback((): void => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	useEffect(() => {
		clear()
	}, [clear])

	const changeCell = (row: number, col: number) => {
		const newField = invertOneCell(field, row, col)
		setField(newField)
	}

	const playOneStep = () => {
		const newField = calculateNextField(field)
		setField(newField)
	}

	return (
		<>
			<GameField field={field} cellSize={cellSize} clickCell={changeCell}/>
			<button onClick={clear}>Clear</button>
			<button onClick={playOneStep}>Step</button>
		</>
	)
}
