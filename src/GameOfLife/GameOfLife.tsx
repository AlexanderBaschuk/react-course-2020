import React, { useState } from 'react'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
}

type Field = boolean[][]

const getInitialState = (rowCount: number, colCount: number): boolean[][] =>
	Array(rowCount).fill(Array(colCount).fill(false))

const GameOfLife: React.FC<GameOfLifeProps> = ({ rowCount, colCount }) => {
	const [field] = useState<Field>(getInitialState(rowCount, colCount))

	return <>{field.map((row) => row.map((value) => value.toString()))}</>
}

export default GameOfLife
