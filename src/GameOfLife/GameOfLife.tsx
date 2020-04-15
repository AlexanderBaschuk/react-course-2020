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

	const fieldStyle = { display: 'block', padding: 0, height: cellSize }

	const changeCell = (): void => {
		setField([
			[true, true],
			[true, true],
		])
	}

	return (
		<>
			{field.map((row, i) => (
				<div key={i} style={fieldStyle}>
					{row.map((value, j) => (
						<Cell
							key={j}
							row={i}
							column={j}
							size={cellSize}
							isAlive={value}
							onClick={changeCell}
						/>
					))}
				</div>
			))}
		</>
	)
}

export default GameOfLife
