import { FieldControls, PlaybackControls } from './components'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GameField } from './components/GameField/GameField'
import { changeCell } from './gameOfLife.slice'
import { fieldSelector } from './gameOfLife.selectors'

interface GameOfLifeProps {
	cellSize: number
}

export const GameOfLife: React.FC<GameOfLifeProps> = ({ cellSize }) => {
	const field = useSelector(fieldSelector)

	const dispatch = useDispatch()

	const invertCell = useCallback(
		(row: number, col: number) => {
			dispatch(changeCell({ row, col }))
		},
		[dispatch],
	)

	return (
		<>
			<FieldControls />
			<PlaybackControls />
			<GameField field={field} cellSize={cellSize} clickCell={invertCell} />
		</>
	)
}
