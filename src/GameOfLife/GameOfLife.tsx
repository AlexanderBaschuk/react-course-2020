import React, { useState, useEffect } from 'react'
import Cell from './Cell'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
	cellSize: number
}

type Field = boolean[][]

const getInitialState = (rowCount: number, colCount: number): boolean[][] =>
	Array(rowCount).fill(Array(colCount).fill(false))

const invertOneCell = (field: Field, row: number, col: number): Field => {
	const newField = field.map((currentRow) => [...currentRow])
	newField[row][col] = !newField[row][col]
	return newField
}

const calculateNextField = (field: Field): Field => {
	const newField = field.map((currentRow) => [...currentRow])
	for (let i = 0; i < field.length; i++)
		for (let j = 0; j < field[i].length; j++) {
			newField[i][j] = !field[i][j]
		}
	return newField
}

const GameOfLife: React.FC<GameOfLifeProps> = ({
	rowCount,
	colCount,
	cellSize,
}) => {
	const [field, setField] = useState<Field>([[false]])

	useEffect(() => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	const rowStyle = { display: 'block', padding: 0, height: cellSize }
	const buttonStyle = { height: 20, width: 100 }

	const changeCell = (row: number, col: number) => () => {
		const newField = invertOneCell(field, row, col)
		setField(newField)
	}

	const playOneStep = () => {
		const newField = calculateNextField(field)
		setField(newField)
	}

	return (
		<>
			{field.map((row, i) => (
				<div key={i} style={rowStyle}>
					{row.map((value, j) => (
						<Cell
							key={j}
							row={i}
							column={j}
							size={cellSize}
							isAlive={value}
							onClick={changeCell(i, j)}
						/>
					))}
				</div>
			))}
			<button onClick={playOneStep}>Play 1 step</button>
		</>
	)
}

export default GameOfLife
