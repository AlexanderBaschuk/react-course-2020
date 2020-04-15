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

	const changeCell = (row: number, col: number) => () => {
		const newField = field.map(currentRow => [...currentRow])
		newField[row][col] = !newField[row][col]
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
		</>
	)
}

export default GameOfLife
