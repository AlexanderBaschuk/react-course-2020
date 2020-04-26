import React from 'react'
import { CellStyled } from '.'
// eslint-disable-next-line no-unused-vars
import { Field } from '../../engine'
import { RowStyled } from './Gamefield.styles'

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
		<>
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
		</>
	)
}
