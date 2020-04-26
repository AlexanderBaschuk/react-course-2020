import React from 'react'
import { CellStyled } from '.'
// eslint-disable-next-line no-unused-vars
import { Field } from '../../engine'

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
	const rowStyle = { display: 'block', padding: 0, height: cellSize }
	return (
		<>
			{field.cells.map((row, i) => (
				<div key={i} style={rowStyle}>
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
				</div>
			))}
		</>
	)
}
