import React, { useState, useEffect } from 'react'
import Cell from './Cell'
import {
	getInitialState,
	invertOneCell,
	calculateNextField,
} from './engine'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
	cellSize: number
}

const GameOfLife: React.FC<GameOfLifeProps> = ({
	rowCount,
	colCount,
	cellSize,
}) => {
	const [field, setField] = useState<boolean[][]>([[]])

	useEffect(() => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	const rowStyle = { display: 'block', padding: 0, height: cellSize }

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
			<button onClick={playOneStep}>Step</button>
		</>
	)
}

export default GameOfLife
