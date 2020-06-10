import { GameFieldStyled, RowStyled } from './GameField.styles'

import { CellStyled } from '.'
import React from 'react'
import { fieldSelector } from '../../gameOfLife.selectors'
import { useSelector } from 'react-redux'

interface IGameFieldProps {
	cellSize: number
	clickCell: (row: number, col: number) => void
}

export const GameField: React.FC<IGameFieldProps> = ({
	cellSize,
	clickCell,
}) => {
	const field = useSelector(fieldSelector)
	return (
		<GameFieldStyled>
			{field.cells.map((row, i) => (
				<RowStyled key={i} height={cellSize}>
					{row.map((value, j) => (
						<CellStyled
							key={j}
							cellSize={cellSize}
							isAlive={value}
							data-row={i}
							data-column={j}
							onClick={() => clickCell(i, j)}
						/>
					))}
				</RowStyled>
			))}
		</GameFieldStyled>
	)
}
