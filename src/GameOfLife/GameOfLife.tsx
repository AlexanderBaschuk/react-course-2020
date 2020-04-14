import React, { useState, useEffect } from 'react'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
}

type Field = boolean[][]

const getInitialState = (rowCount: number, colCount: number): boolean[][] =>
	Array(rowCount).fill(Array(colCount).fill(false))

const GameOfLife: React.FC<GameOfLifeProps> = ({ rowCount, colCount }) => {
	const [field, setField] = useState<Field>([[false]])

	useEffect(() => {
		setField(getInitialState(rowCount, colCount))
	}, [rowCount, colCount])

	return (
		<>
			{field.map((row, i) => (
				<div key={i} style={{ display: 'block' }}>
					{row.map((value) => value.toString() + ' ')}
				</div>
			))}
		</>
	)
}

export default GameOfLife
