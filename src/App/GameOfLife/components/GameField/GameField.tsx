import { GameFieldStyled, RowStyled } from './GameField.styles'
import React, { useCallback, useEffect } from 'react'
import { changeCell, initAction } from '../../gameOfLife.slice'
import { useDispatch, useSelector } from 'react-redux'

import { CellStyled } from '.'
import { fieldSelector } from '../../gameOfLife.selectors'

interface IGameFieldProps {
	cellSize: number
}

export const GameField: React.FC<IGameFieldProps> = ({ cellSize }) => {
	const dispatch = useDispatch()

	const field = useSelector(fieldSelector)

	const clickCell = useCallback(
		(row: number, col: number) => {
			dispatch(changeCell({ row, col }))
		},
		[dispatch],
	)

	useEffect(() => {
		dispatch(initAction())
	}, [dispatch])

	return (
		<GameFieldStyled>
			{field.map((row, i) => (
				<RowStyled key={i} height={cellSize}>
					{row.map((value, j) => (
						<CellStyled
							key={j}
							cellSize={cellSize}
							isAlive={value}
							data-row={i}
							data-column={j}
							data-alive={value}
							onClick={() => clickCell(i, j)}
						/>
					))}
				</RowStyled>
			))}
		</GameFieldStyled>
	)
}
