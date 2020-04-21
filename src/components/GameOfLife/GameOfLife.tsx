import React, { useState, useEffect, useCallback } from 'react'
import { getInitialState, invertOneCell, calculateNextField } from './engine'
import { CellStyled } from './components'

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
	const [field, setField] = useState<boolean[][]>([[]])

	const clear = useCallback((): void => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	useEffect(() => {
		clear()
	}, [clear])

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
						<CellStyled
							key={j}
							cellSize={cellSize}
							isAlive={value}
							data-row={i}
							data-column={j}
							onClick={changeCell(i, j)}
						/>
					))}
				</div>
			))}
			<button onClick={clear}>Clear</button>
			<button onClick={playOneStep}>Step</button>
		</>
	)
}