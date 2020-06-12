import {
	DEFAULT_COL_COUNT,
	DEFAULT_DENSITY,
	DEFAULT_ROW_COUNT,
} from './gameOfLife.state'
import { FieldControls, PlaybackControls } from './components'
import React, { useCallback, useEffect } from 'react'
import { changeCell, setField } from './gameOfLife.slice'
import { useDispatch, useSelector } from 'react-redux'

import { GameField } from './components/GameField/GameField'
import { fieldSelector } from './gameOfLife.selectors'
import { getInitialState } from './engine'

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

	useEffect(() => {
		dispatch(
			setField(
				getInitialState(DEFAULT_ROW_COUNT, DEFAULT_COL_COUNT, DEFAULT_DENSITY),
			),
		)
	}, [])

	return (
		<>
			<FieldControls />
			<PlaybackControls />
			<GameField field={field} cellSize={cellSize} clickCell={invertCell} />
		</>
	)
}
