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

const countNeighbours = (field: Field, row: number, col: number): number => {
	const rowCount = field.length
	const colCount = rowCount == 0 ? 0 : field[0].length
	let result = 0
	for (let i = -1; i <= 1; i++)
		for (let j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue
			}
			if (
				field[(rowCount + row + i) % rowCount][(colCount + col + j) % colCount]
			) {
				result++
			}
		}
	return result
}

const calculateNextField = (field: Field): Field => {
	const newField = field.map((row) => [...row])
	for (let r = 0; r < field.length; r++) {
		for (let c = 0; c < field[r].length; c++) {
			const neighbours = countNeighbours(field, r, c)
			if (field[r][c]) {
				newField[r][c] = neighbours == 2 || neighbours == 3
			} else {
				newField[r][c] = neighbours == 3
			}
		}
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
