import { GameFieldStyled, RowStyled } from './GameField.styles'

import { CellStyled } from '.'
import { Field } from '../../engine'
import React from 'react'

interface IGameFieldProps {
	field: Field
	cellSize: number
	clickCell: (row: number, col: number) => void
	animate: boolean
	duration: number
}

export const GameField: React.FC<IGameFieldProps> = ({
	field,
	cellSize,
	clickCell,
	animate,
	duration,
}) => {
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
							animate={animate}
							duration={duration}
						/>
					))}
				</RowStyled>
			))}
		</GameFieldStyled>
	)
}
